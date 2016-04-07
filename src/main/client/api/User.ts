import {Api, Response} from './Api';
import * as Entities from '../entities';
import {get} from './utils/request';


export class User extends Api {
    constructor() {
        super(`api/users`);
    }

    /**
     * Get special element from web storage
     * @param id identifier of element 
     */
    public get(id: number): Promise<Response<Entities.User>> {
        return fetch(get(`${this.endpoint}/${id}`));
    }
}

export default User;