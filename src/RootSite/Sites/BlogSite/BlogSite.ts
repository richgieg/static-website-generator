import { IndexPage } from './Pages/IndexPage';
import { Entry20190805Page } from './Pages/Entry20190805Page';
import { Entry20190804Page } from './Pages/Entry20190804Page';

class BlogSite {

    public readonly title = 'My Blog';
    public readonly theme = {
        backgroundColor: '#00ff00',
        textColor: '#000000',
    };
    public readonly pages = {
        index: new IndexPage(),
        20190804: new Entry20190804Page(),
        20190805: new Entry20190805Page(),
    };
    public readonly sites = {};
}

export const blogSite = new BlogSite();
