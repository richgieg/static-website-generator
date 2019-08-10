import { Page } from '../../../../Page';
import { blogSite } from '../BlogSite';
import { rootSite } from '../../../RootSite';

export class Entry20190805Page extends Page {

    public readonly title = '2019-08-05';

    protected getContent(): string {
        return `
            <h1>${this.getFullTitle()}</h1>
            <p>${this.link(blogSite.pages.index, 'Blog Home')}</p>
            <p>${this.link(rootSite.pages.index, 'Home')}</p>
        `;
    }

}
