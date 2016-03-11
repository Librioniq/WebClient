import {PostApi} from './Post';
import {Comment} from '../entities';


export class CommentApi extends PostApi<Comment> {
    constructor() {
        super("");
    }
}

export default CommentApi;