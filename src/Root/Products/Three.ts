import { Page } from '../../Page';

export class Three extends Page {

    public readonly title = 'Three';

    protected getContent(): string {
        return this.getFullTitle();
    }

}
