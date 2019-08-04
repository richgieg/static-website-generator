import * as fs from 'fs';
import * as path from 'path';
import { ISite, rootSite } from './RootSite/RootSite';
import { config } from './Config';

function main(): void {
    initializeSite(rootSite);
    renderSite(rootSite);
}

function initializeSite(site: ISite): void {
    const sites: ISite[] = [];
    const pathSegments: string[] = [];
    initializeSiteBranch(site);
    function initializeSiteBranch(siteBranch: ISite): void {
        sites.push(siteBranch);
        for (const siteId of Object.keys(siteBranch.sites)) {
            pathSegments.push(siteId);
            const childSite = siteBranch.sites[siteId];
            initializeSiteBranch(childSite);
            pathSegments.pop();
        }
        for (const pageId of Object.keys(siteBranch.pages)) {
            const page = siteBranch.pages[pageId];
            page.initialize(pageId, sites, pathSegments);
        }
        sites.pop();
    }
}

function renderSite(site: ISite): void {
    renderSiteBranch(site);
    function renderSiteBranch(siteBranch: ISite): void {
        for (const siteId of Object.keys(siteBranch.sites)) {
            const childSite = siteBranch.sites[siteId];
            renderSiteBranch(childSite);
        }
        for (const pageId of Object.keys(siteBranch.pages)) {
            const page = siteBranch.pages[pageId];
            const html = page.render();
            const filePath = path.join(config.outputDirectory, page.getFilePath());
            if (!fs.existsSync(path.dirname(filePath))) {
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
            }
            fs.writeFileSync(filePath, html);
        }
    }
}

main();
