import * as fs from 'fs';
import * as path from 'path';
import { ISite } from './ISite';
import { ThemeBuilder } from './ThemeBuilder';
import { root } from './Root/_Root';
import { config } from './Config';

const WWW_DIRECTORY = 'output/www';

function main(): void {
    try {
        initializeSite(root);
        const startTime = new Date().getTime();
        renderSite(root);
        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        console.log(`Site rendered (${elapsedTime}ms)`);
    } catch (error) {
        console.error(error);
    }
}

function initializeSite(site: ISite): void {
    const sites: ISite[] = [];
    const pathSegments: string[] = [];
    const themeBuilder = new ThemeBuilder();
    initializeSiteBranch(site);
    function initializeSiteBranch(siteBranch: ISite): void {
        sites.push(siteBranch);
        if (siteBranch.theme) {
            themeBuilder.push(siteBranch.theme);
        }
        for (const siteId of Object.keys(siteBranch.sites)) {
            pathSegments.push(siteId);
            const childSite = siteBranch.sites[siteId];
            initializeSiteBranch(childSite);
            pathSegments.pop();
        }
        for (const pageId of Object.keys(siteBranch.pages)) {
            const page = siteBranch.pages[pageId];
            page.initialize(pageId, sites, pathSegments, themeBuilder.getTheme());
        }
        if (siteBranch.theme) {
            themeBuilder.pop();
        }
        sites.pop();
    }
}

function renderSite(site: ISite): void {
    const sitemapUrls: string[] = [];
    renderSiteBranch(site);
    function renderSiteBranch(siteBranch: ISite): void {
        for (const siteId of Object.keys(siteBranch.sites)) {
            const childSite = siteBranch.sites[siteId];
            renderSiteBranch(childSite);
        }
        for (const pageId of Object.keys(siteBranch.pages)) {
            const page = siteBranch.pages[pageId];
            sitemapUrls.push(`${config.siteUrl}${page.getAbsoluteUrl()}`);
            const html = page.render();
            const filePath = path.join(WWW_DIRECTORY, page.getFilePath());
            if (!fs.existsSync(path.dirname(filePath))) {
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
            }
            fs.writeFileSync(filePath, html);
        }
    }
    generateSitemapTxt(sitemapUrls);
    generateRobotsTxt();
}

function generateSitemapTxt(sitemapUrls: string[]): void {
    const filePath = path.join(WWW_DIRECTORY, 'sitemap.txt');
    sitemapUrls.sort();
    fs.writeFileSync(filePath, `${sitemapUrls.join('\n')}\n`);
}

function generateRobotsTxt(): void {
    const filePath = path.join(WWW_DIRECTORY, 'robots.txt');
    const lines = [
        'user-agent: *',
        'allow: /',
        `sitemap: ${config.siteUrl}/sitemap.txt`,
    ];
    fs.writeFileSync(filePath, `${lines.join('\n')}\n`);
}

main();
