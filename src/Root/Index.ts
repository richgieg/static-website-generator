import { Page } from '../Page';

export class Index extends Page {

    public readonly title = '';

    protected getContent(): string {
        return this.getFullTitle();
    }

}
