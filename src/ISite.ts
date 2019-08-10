import { Page } from './Page';

export interface ISite {
    title: string;
    theme: {
        backgroundColor: string;
        textColor: string;
    };
    pages: { [id: string]: Page };
    sites: { [id: string]: ISite };
}
