import { Page } from '../../Page';

export class Two extends Page {

    public readonly title = 'Two';

    protected getContent(): string {
        return this.getFullTitle();
    }

}
