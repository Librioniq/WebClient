import {Api, Response} from './Api';

export interface PostInterface {
    id?: number;
    content: string;
    createdDate?: Date;
    createdBy?: any;
    lastModifiedDate?: Date;
    lastModifiedBy?: any;
    rating?: number;
}

export abstract class Post<T extends PostInterface> extends Api {
    /**
     * List elements
     */
    public abstract list(...args: any[]): Promise<Response<T>>;
    /**
     * Get special element from web storage
     * @param id identifier of element
     */
    public abstract get(...args: any[]): Promise<Response<T>>;
    /**
     * Create special element from given entity
     */
    public abstract post(...args: any[]): Promise<Response<T>>;
    /**
     * Update special element
     */
    public abstract put(...args: any[]): Promise<Response<T>>;
    /**
     * Delete special element
     */
    public abstract delete(...args: any[]): Promise<Response<T>>;
}

export default Post;
