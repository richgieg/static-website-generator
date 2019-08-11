import { Index } from './Index';

class Site {

    public readonly title = 'Products';
    public readonly pages = {
        index: new Index(),
    };
    public readonly sites = {};

}

export const products = new Site();
