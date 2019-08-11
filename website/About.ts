import { Page } from '../generator/Page';

export class About extends Page {

    public readonly title = 'About';

    protected getContent(): string {
        return this.getFullTitle();
    }

}
