import { Page } from '../Page';
import { AboutPage } from './Pages/AboutPage';
import { ContactPage } from './Pages/ContactPage';
import { IndexPage } from './Pages/IndexPage';
import { blogSite } from './Sites/BlogSite/BlogSite';

export interface ISite {
    title: string;
    pages: { [id: string]: Page };
    sites: { [id: string]: ISite };
}

class RootSite {

    public readonly title = 'My Website';
    public readonly pages = {
        about: new AboutPage(),
        contact: new ContactPage(),
        index: new IndexPage(),
    };
    public readonly sites = {
        blog: blogSite,
    };

}

export const rootSite = new RootSite();
