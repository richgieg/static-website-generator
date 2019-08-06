import * as path from 'path';
import { ISite } from './RootSite/RootSite';
import { View } from './View';

interface IParams {
    readonly title: string;
}

export abstract class Page {

    private readonly title: string;
    private id: string;
    private sites: ISite[];
    private pathSegments: string[];

    constructor(params: IParams) {
        this.title = params.title;
        this.id = '';
        this.sites = [];
        this.pathSegments = [];
    }

    public initialize(id: string, sites: ISite[], pathSegments: string[]): void {
        this.id = id;
        this.sites = sites.slice(0);
        this.pathSegments = pathSegments.slice(0);
    }

    public getId(): string {
        return this.id;
    }

    public getFilePath(): string {
        const pathSegments = this.pathSegments.slice(0);
        pathSegments.push(`${this.id}.html`);
        return path.join(...pathSegments);
    }

    public getTitle(): string {
        return this.title;
    }

    public getFullTitle(): string {
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

    public render(): string {
        const view = new View();
        this.buildView(view);
        return `<!DOCTYPE html>
<html>
    <head>
        <title>${this.getFullTitle()}</title>
    </head>
    <body>
        ${view.toString()}
    </body>
</html>
`;
    }

    public url(page: Page): string {
        const pathSegments = page.pathSegments.slice(0);
        pathSegments.push((page.id !== 'index') ? `${page.id}.html` : '');
        return '/' + pathSegments.join('/');
    }

    protected abstract buildView(view: View): void;

}
