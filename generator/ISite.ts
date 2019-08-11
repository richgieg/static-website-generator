import { Page } from './Page';
import { IThemeParams } from './ThemeBuilder';

export interface ISite {
    title: string;
    theme?: IThemeParams;
    pages: { [id: string]: Page };
    sites: { [id: string]: ISite };
}
