import { Page } from '../../../../Page';
import { View } from '../../../../View';
import { rootSite } from '../../../RootSite';
import { blogSite } from '../BlogSite';

export class Entry20190804Page extends Page {

    constructor() {
        super({
            title: '2019-08-04',
        });
    }

    protected buildView(view: View): void {
        view
            .addHeading(this.getFullTitle())
            .addParagraph(`<a href="${this.url(blogSite.pages.index)}">Blog Home</a>`)
            .addParagraph(`<a href="${this.url(rootSite.pages.index)}">Home</a>`);
    }

}
