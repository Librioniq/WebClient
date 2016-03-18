import {Post, Response} from './Post';
import {post, get, put, remove} from './utils/request';
import * as Entities from '../entities';


export class Question extends Post<Entities.Question> {
    constructor() {
        super("http://localhost:8082/api/questions");
    }

    /**
     * List elements
     */
    public list(): Promise<Response<Entities.Question>> {
        return fetch(get(`${this.endpoint}`));
    }
    /**
     * Get special element from web storage
     * @param id identifier of element 
     */
    public get(id: number): Promise<Response<Entities.Question>> {
        return fetch(get(`${this.endpoint}/${id}`));
    }
    /**
     * Create special element from given entity
     */
    public post(element: Entities.Question): Promise<Response<Entities.Question>> {
        return fetch(this.endpoint, post(element));
    }
    /**
     * Update special element
     */
    public put(element: Entities.Question): Promise<Response<Entities.Question>> {
        return fetch(this.endpoint, put(element));
    }
    /**
     * Delete special element
     */
    public delete(id: number): Promise<IResponse> {
        return fetch(remove(`${this.endpoint}/${id}`));
    }
}

export default Question;