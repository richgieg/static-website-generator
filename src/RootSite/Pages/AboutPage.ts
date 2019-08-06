import { Page } from '../../Page';
import { View } from '../../View';
import { rootSite } from '../RootSite';

export class AboutPage extends Page {

    constructor() {
        super({
            title: 'About',
        });
    }

    protected buildView(view: View): void {
        view
            .addHeading('About')
            .addParagraph(`<a href="${this.url(rootSite.pages.index)}">Home</a>`);
    }

}
