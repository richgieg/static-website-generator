export interface ITheme {
    backgroundColor: string;
    textColor: string;
    font: string;
}

export interface IThemeParams {
    backgroundColor?: string;
    textColor?: string;
    font?: string;
}

const defaultTheme: ITheme = {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    font: 'sans-serif',
};

export class ThemeBuilder {

    private readonly themeParamsStack: IThemeParams[] = [];
    private readonly backgroundColorStack: string[] = [];
    private readonly textColorStack: string[] = [];
    private readonly fontStack: string[] = [];

    constructor() {
        this.push(defaultTheme);
    }

    public push(themeParams: IThemeParams): void {
        this.themeParamsStack.push(themeParams);
        if (themeParams.backgroundColor) {
            this.backgroundColorStack.push(themeParams.backgroundColor);
        }
        if (themeParams.textColor) {
            this.textColorStack.push(themeParams.textColor);
        }
        if (themeParams.font) {
            this.fontStack.push(themeParams.font);
        }
    }

    public pop(): void {
        const themeParams = this.themeParamsStack.pop();
        if (themeParams) {
            if (themeParams.backgroundColor) {
                this.backgroundColorStack.pop();
            }
            if (themeParams.textColor) {
                this.textColorStack.pop();
            }
            if (themeParams.font) {
                this.fontStack.pop();
            }
        }
    }

    public getTheme(): ITheme {
        return {
            backgroundColor: this.backgroundColorStack[this.backgroundColorStack.length - 1],
            textColor: this.textColorStack[this.textColorStack.length - 1],
            font: this.fontStack[this.fontStack.length - 1],
        };
    }

}
