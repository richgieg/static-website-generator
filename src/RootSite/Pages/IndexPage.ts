import { Page } from '../../Page';
import { rootSite } from '../RootSite';

export class IndexPage extends Page {

    public readonly title = '';

    protected getContent(): string {
        return `
            <h1>${this.getFullTitle()}</h1>
            <p>Here is some paragraph text...</p>
            <p>
                ${this.link(rootSite.pages.about, 'About')} |
                ${this.link(rootSite.pages.contact, 'Contact')} |
                ${this.link(rootSite.sites.blog.pages.index, 'Blog')}
            </p>
        `;
    }

}
