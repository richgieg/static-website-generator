import { Page } from '../Page';

export class Contact extends Page {

    public readonly title = 'Contact';

    protected getContent(): string {
        return this.getFullTitle();
    }

}
