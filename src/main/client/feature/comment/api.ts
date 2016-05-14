import { Model } from './Model';

import { Post } from '../utils/Post';
import { Response } from '../utils/Api';
import { post, get, put, remove } from '../utils/request';
import { expand } from '../utils/url';

export class Api extends Post<Model> {
    constructor() {
        super(`api/posts/:postId/comments`);
    }

    /**
     * List elements
     */
    public list(postId: number): Promise<Response<Model>> {
        return fetch(get(`${expand(this.endpoint, { postId })}`));
    }
    /**
     * Get special element from web storage
     * @param id identifier of element
     */
    public get(postId: number, id: number): Promise<Response<Model>> {
        return fetch(get(`${expand(this.endpoint, { postId })}/${id}`));
    }
    /**
     * Create special element from given entity
     */
    public post(postId: number, element: Model): Promise<Response<Model>> {
        return fetch(expand(this.endpoint, { postId }), post(element));
    }
    /**
     * Update special element
     */
    public put(postId: number, element: Model): Promise<Response<Model>> {
        return fetch(expand(this.endpoint, { postId }), put(element));
    }
    /**
     * Delete special element
     */
    public delete(postId: number, id: number): Promise<Response<Model>> {
        return fetch(remove(`${expand(this.endpoint, { postId })}/${id}`));
    }
}

export default Api;
