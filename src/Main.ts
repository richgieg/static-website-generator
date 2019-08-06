import * as fs from 'fs';
import * as path from 'path';
import { ISite, rootSite } from './RootSite/RootSite';

function main(): void {
    initializeSite(rootSite);
    try {
        const startTime = new Date().getTime();
        renderSite(rootSite);
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
            const filePath = path.join('output/www', page.getFilePath());
            if (!fs.existsSync(path.dirname(filePath))) {
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
            }
            fs.writeFileSync(filePath, html);
        }
    }
}

main();
