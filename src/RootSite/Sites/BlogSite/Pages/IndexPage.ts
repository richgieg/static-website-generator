import { Page } from '../../../../Page';
import { View } from '../../../../View';
import { rootSite } from '../../../RootSite';
import { blogSite } from '../BlogSite';

export class IndexPage extends Page {

    constructor() {
        super({
            title: '',
        });
    }

    protected buildView(view: View): void {
        view
            .addHeading(this.getFullTitle())
            .addParagraph(`<a href="${this.url(blogSite.pages[20190805])}">${blogSite.pages[20190805].getTitle()}</a>`)
            .addParagraph(`<a href="${this.url(blogSite.pages[20190804])}">${blogSite.pages[20190804].getTitle()}</a>`)
            .addParagraph(`<a href="${this.url(rootSite.pages.index)}">Home</a>`);
    }

}
