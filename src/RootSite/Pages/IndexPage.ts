import { Page } from '../../Page';
import { View } from '../../View';
import { rootSite } from '../RootSite';

export class IndexPage extends Page {

    constructor() {
        super({
            title: '',
        });
    }

    protected buildView(view: View): void {
        view
            .addHeading('Welcome', 3)
            .addParagraph('Here is some paragraph text...')
            .addParagraph(`
                <a href="${this.url(rootSite.pages.about)}">About</a> |
                <a href="${this.url(rootSite.pages.contact)}">Contact</a>`,
            );
    }

}
