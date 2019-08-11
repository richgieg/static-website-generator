import { Index } from './Index';
import { One } from './One';
import { Two } from './Two';
import { Three } from './Three';

class Site {

    public readonly title = 'Products';
    public readonly pages = {
        index: new Index(),
        one: new One(),
        two: new Two(),
        three: new Three(),
    };
    public readonly sites = {};

}

export const products = new Site();
