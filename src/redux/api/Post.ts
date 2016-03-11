import {post, get, put, remove} from './utils/request';
import {Post} from '../entities';

export abstract class PostApi<T extends Post> {
    constructor(private endpoint: string) { }
    /**
     * List elements
     */
    public list() {
        fetch(get(`${this.endpoint}`));
    }
    /**
     * Get special element from web storage
     * @param id identifier of element 
     */
    public get(id: number) {
        fetch(get(`${this.endpoint}/${id}`));
    }
    /**
     * Create special element from given entity
     */
    public post(element: T) {
        fetch(this.endpoint, post(element));
    }
    /**
     * Update special element
     */
    public put(element: T) {
        fetch(this.endpoint, put(element));
    }
    /**
     * Delete special element
     */
    public delete(id: number) {
        fetch(remove(`${this.endpoint}/${id}`));
    }
}

export default PostApi;