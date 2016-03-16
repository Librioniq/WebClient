import {PostApi} from './Post';
import {Comment} from '../entities';
import {post, get, put, remove} from './utils/request';


export class CommentApi extends PostApi<Comment> {
    constructor() {
        super("");
    }

    /**
     * List elements
     */
    public list(): Promise<IResponse> {
        return fetch(get(`${this.endpoint}`));
    }
    /**
     * Get special element from web storage
     * @param id identifier of element 
     */
    public get(id: number): Promise<IResponse> {
        return fetch(get(`${this.endpoint}/${id}`));
    }
    /**
     * Create special element from given entity
     */
    public post(element: Comment): Promise<IResponse> {
        return fetch(this.endpoint, post(element));
    }
    /**
     * Update special element
     */
    public put(element: Comment): Promise<IResponse> {
        return fetch(this.endpoint, put(element));
    }
    /**
     * Delete special element
     */
    public delete(id: number): Promise<IResponse> {
        return fetch(remove(`${this.endpoint}/${id}`));
    }
}

export default CommentApi;