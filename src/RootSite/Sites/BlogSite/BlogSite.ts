import { IndexPage } from './Pages/IndexPage';

class BlogSite {

    public readonly title = 'My Blog';
    public readonly pages = {
        index: new IndexPage(),
    };
    public readonly sites = {};
}

export const blogSite = new BlogSite();
