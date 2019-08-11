import { Page } from '../Page';

export class About extends Page {

    public readonly title = 'About';

    protected getContent(): string {
        return this.getFullTitle();
    }

}
