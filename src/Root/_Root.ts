import { Index } from './Index';
import { About } from './About';
import { Contact } from './Contact';

class Site {

    public readonly title = 'My Website';
    public readonly theme = {
        backgroundColor: '#ffffff',
        textColor: '#000000',
    };
    public readonly pages = {
        index: new Index(),
        about: new About(),
        contact: new Contact(),
    };
    public readonly sites = {};

}

export const root = new Site();
