import { Page } from '../generator/Page';
import { root } from './_Root';
import { products } from './Products/_Products';

export class Index extends Page {

    public readonly title = '';

    protected getContent(): string {
        return `
            <h1>${this.getFullTitle()}</h1>
            <p>
                ${this.link(products.pages.index, 'Products')} |
                ${this.link(root.pages.about, 'About')} |
                ${this.link(root.pages.contact, 'Contact')}
            </p>
        `;
    }

}
