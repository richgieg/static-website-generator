import { Page } from '../../../../Page';
import { View } from '../../../../View';
import { rootSite } from '../../../RootSite';

export class IndexPage extends Page {

    constructor() {
        super({
            title: '',
        });
    }

    protected buildView(view: View): void {
        view
            .addHeading('My Blog')
            .addParagraph(`<a href="${this.url(rootSite.pages.index)}">Home</a>`);
    }

}
