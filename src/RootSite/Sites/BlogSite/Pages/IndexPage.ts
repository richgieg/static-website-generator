import { Page } from '../../../../Page';
import { blogSite } from '../BlogSite';
import { rootSite } from '../../../RootSite';

export class IndexPage extends Page {

    public readonly title = '';

    protected getContent(): string {
        return `
            <h1>${this.getFullTitle()}</h1>
            <p>${this.link(blogSite.pages[20190805], blogSite.pages[20190805].title)}</p>
            <p>${this.link(blogSite.pages[20190804], blogSite.pages[20190804].title)}</p>
            <p>${this.link(rootSite.pages.index, 'Home')}</p>
        `;
    }

}
