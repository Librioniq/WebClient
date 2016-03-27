import {Post} from '../../client/entities';

const dbGlobalKey = "__lokiDatabase";

export const {post, postToPosts} = (() => {
    let result: { post: LokiCollection<Post>, postToPosts: LokiCollection<{ parentId: number, childId: number }> };

    if (!global[dbGlobalKey]) {
        const reference = require('./create');

        result = global[dbGlobalKey] = { post: reference.post, postToPosts: reference.postToPosts };
    } else {
        result = global[dbGlobalKey];
    }

    return result;
})();

export default { post, postToPosts };