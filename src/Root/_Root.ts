import { Index } from './Index';
import { About } from './About';
import { Contact } from './Contact';
import { products } from './Products/_Products';

class Site {

    public readonly title = 'Static Website Generator';
    public readonly theme = {
        backgroundColor: '#ffffff',
        textColor: '#000000',
    };
    public readonly pages = {
        index: new Index(),
        about: new About(),
        contact: new Contact(),
    };
    public readonly sites = {
        products,
    };

}

export const root = new Site();
