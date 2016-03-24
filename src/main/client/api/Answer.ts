import {Post, Response} from './Post';
import * as Entities from '../entities';
import {post, get, put, remove} from './utils/request';
import {expand} from './utils/url';


export class Answer extends Post<Entities.Answer> {
    constructor() {
        super("api/questions/:questionId/answers");
    }

    /**
     * List elements
     */
    public list(questionId: number): Promise<Response<Entities.Answer>> {
        return fetch(get(`${expand(this.endpoint, { questionId })}`));
    }
    /**
     * Get special element from web storage
     * @param id identifier of element 
     */
    public get(questionId: number, id: number): Promise<Response<Entities.Answer>> {
        return fetch(get(`${expand(this.endpoint, { questionId })}/${id}`));
    }
    /**
     * Create special element from given entity
     */
    public post(questionId: number, element: Entities.Answer): Promise<Response<Entities.Answer>> {
        return fetch(expand(this.endpoint, { questionId }), post(element));
    }
    /**
     * Update special element
     */
    public put(questionId: number, element: Entities.Answer): Promise<Response<Entities.Answer>> {
        return fetch(expand(this.endpoint, { questionId }), put(element));
    }
    /**
     * Delete special element
     */
    public delete(questionId: number, id: number): Promise<Response<Entities.Answer>> {
        return fetch(remove(`${expand(this.endpoint, { questionId })}/${id}`));
    }
}

export default Answer;
