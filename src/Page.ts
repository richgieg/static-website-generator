import { join as pathJoin } from 'path';
import { ISite } from './ISite';
import { ITheme } from './ThemeBuilder';
import { config } from './Config';

export abstract class Page {

    private static buildTimeMs = new Date().getTime();
    private static buildTimeString = new Date(Page.buildTimeMs).toISOString();

    protected abstract readonly title: string;

    private id!: string;
    private sites!: ISite[];
    private pathSegments!: string[];
    private theme!: ITheme;

    public initialize(id: string, sites: ISite[], pathSegments: string[], theme: ITheme): void {
        this.id = id;
        this.sites = sites.slice();
        this.pathSegments = pathSegments.slice();
        this.theme = theme;
    }

    public getFilePath(): string {
        const pathSegments = this.pathSegments.slice();
        pathSegments.push(`${this.id}.html`);
        return pathJoin(...pathSegments);
    }

    public render(): string {
        return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>${this.getFullTitle()}</title>
        <link rel="shortcut icon" href="${this.assetUrl('favicon.ico')}">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">
        <meta name="build-time" content="${Page.buildTimeString}">
        ${this.getGoogleSiteVerificationMetaTag()}
        <style>
            html {
                background-color: ${this.theme.backgroundColor};
                color: ${this.theme.textColor};
                font-family: ${this.theme.fontFamily};
                font-size: ${this.theme.baseFontSize};
            }
        </style>
    </head>
    <body>
        ${this.getContent()}
    </body>
</html>
`;
    }

    public getAbsoluteUrl(): string {
        const pathSegments = this.pathSegments.slice();
        if (this.id !== 'index') {
            pathSegments.push(this.id);
        }
        return `/${pathSegments.join('/')}`;
    }

    protected getFullTitle(): string {
        const fullTitleParts: string[] = [];
        for (const site of this.sites) {
            fullTitleParts.push(site.title);
        }
        if (this.title) {
            fullTitleParts.push(this.title);
        }
        fullTitleParts.reverse();
        return fullTitleParts.join(' | ');
    }

    protected link(destination: Page | string, label: string): string {
        let url: string;
        if (destination instanceof Page) {
            url = this.pageUrl(destination);
        } else {
            url = destination;
        }
        return `<a href="${url}">${label}</a>`;
    }

    protected pageUrl(page: Page): string {
        let relativePath;
        let relativePathSegments = [];
        let i = 0;
        const minLength = Math.min(this.pathSegments.length, page.pathSegments.length);
        while (i < minLength && this.pathSegments[i] === page.pathSegments[i]) {
            i++;
        }
        if (this.pathSegments.length === i && page.pathSegments.length === i) {
            if (page.id !== 'index') {
                if (this.pathSegments.length > 0) {
                    relativePath = `${this.pathSegments[this.pathSegments.length - 1]}/${page.id}`;
                } else {
                    relativePath = `${page.id}`;
                }
            } else {
                if (this.pathSegments.length > 0) {
                    relativePath = `../${this.pathSegments[this.pathSegments.length - 1]}`;
                } else {
                    relativePath = '.';
                }
            }
        } else {
            for (let j = 0; j < this.pathSegments.length - i; j++) {
                relativePathSegments.push('..');
            }
            relativePathSegments = relativePathSegments.concat(page.pathSegments.slice(i));
            if (page.id !== 'index') {
                relativePathSegments.push(`${page.id}`);
            }
            relativePath = relativePathSegments.join('/');
        }
        return relativePath;
    }

    protected assetUrl(path: string): string {
        const assetPathSegments = ['_assets'].concat(path.split('/'));
        let relativePath;
        let relativePathSegments = this.pathSegments.map(() => '..');
        relativePathSegments = relativePathSegments.concat(assetPathSegments);
        relativePath = relativePathSegments.join('/');
        return relativePath;
    }

    protected abstract getContent(): string;

    private getGoogleSiteVerificationMetaTag(): string {
        if (config.googleSiteVerification) {
            return `<meta name="google-site-verification" content="${config.googleSiteVerification}">`;
        } else {
            return '';
        }
    }

}
