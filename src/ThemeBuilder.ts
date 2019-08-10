export interface ITheme {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    baseFontSize: string;
}

export interface IThemeParams {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    baseFontSize?: string;
}

const defaultTheme: ITheme = {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontFamily: 'sans-serif',
    baseFontSize: '16px',
};

export class ThemeBuilder {

    private readonly stacks = {
        backgroundColor: [] as string[],
        textColor: [] as string[],
        fontFamily: [] as string[],
        baseFontSize: [] as string[],
    };
    private readonly themeParamsStack: IThemeParams[] = [];

    constructor() {
        this.push(defaultTheme);
    }

    public push(themeParams: IThemeParams): void {
        this.themeParamsStack.push(themeParams);
        for (const key in themeParams) {
            if (themeParams.hasOwnProperty(key)) {
                if (key in this.stacks) {
                    (this.stacks as any)[key].push((themeParams as any)[key]);
                } else {
                    throw new Error(`Missing stack "${key}" in ThemeBuilder.stacks`);
                }
            }
        }
    }

    public pop(): void {
        const themeParams = this.themeParamsStack.pop();
        for (const key in themeParams) {
            if (themeParams.hasOwnProperty(key) && this.stacks.hasOwnProperty(key)) {
                (this.stacks as any)[key].pop();
            }
        }
    }

    public getTheme(): ITheme {
        const theme = {} as any;
        for (const key in this.stacks) {
            if (this.stacks.hasOwnProperty(key)) {
                const stack = (this.stacks as any)[key] as string[];
                theme[key] = stack[stack.length - 1];
            }
        }
        return theme as ITheme;
    }

}
