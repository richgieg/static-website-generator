import { Page } from '../../Page';
import { View } from '../../View';
import { rootSite } from '../RootSite';

export class ContactPage extends Page {

    constructor() {
        super({
            title: 'Contact',
        });
    }

    protected buildView(view: View): void {
        view
            .addHeading('Contact')
            .addParagraph(`<a href="${this.url(rootSite.pages.index)}">Home</a>`);
    }

}
