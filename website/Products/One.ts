import { Page } from '../../generator/Page';

export class One extends Page {

    public readonly title = 'One';

    protected getContent(): string {
        return this.getFullTitle();
    }

}
