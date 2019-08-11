import { Page } from '../../generator/Page';
import { products } from './_Products';

export class Index extends Page {

    public readonly title = '';

    protected getContent(): string {
        return `
            <h1>${this.getFullTitle()}</h1>
            <p>
                ${this.link(products.pages.one, 'One')} |
                ${this.link(products.pages.two, 'Two')} |
                ${this.link(products.pages.three, 'Three')}
            </p>
        `;
    }

}
