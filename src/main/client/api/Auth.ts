import {Api, Response} from './Api';
import * as Entities from '../entities';
import {post} from './utils/request';


export class Auth extends Api {
    constructor() {
        super("api/auth");
    }

    /**
     * Authorize user
     */
    public authorize(login: string, password: string): Promise<Response<Entities.User>> {
        return fetch(this.endpoint, post({ login, password }));
    }
}

export default Auth;
