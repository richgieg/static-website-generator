export class View {

    private readonly components: string[];

    constructor() {
        this.components = [];
    }

    public addHeading(text: string, level: 1|2|3|4|5|6 = 1): this {
        this.components.push(`<h${level}>${text}</h${level}>`);
        return this;
    }

    public addParagraph(text: string): this {
        this.components.push(`<p>${text}</p>`);
        return this;
    }

    public toString(): string {
        return `<div>${this.components.join('')}</div>`;
    }

}
