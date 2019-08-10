import { Page } from '../../Page';
import { rootSite } from '../RootSite';

export class AboutPage extends Page {

    public readonly title = 'About';

    protected getContent(): string {
        return `
            <h1>${this.getFullTitle()}</h1>
            <p>${this.link(rootSite.pages.index, 'Home')}</p>
        `;
    }

}
