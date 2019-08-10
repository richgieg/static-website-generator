import { Page } from '../../Page';
import { rootSite } from '../RootSite';

export class ContactPage extends Page {

    public readonly title = 'Contact';

    protected getContent(): string {
        return `
            <h1>${this.getFullTitle()}</h1>
            <p>${this.link(rootSite.pages.index, 'Home')}</p>
        `;
    }

}
