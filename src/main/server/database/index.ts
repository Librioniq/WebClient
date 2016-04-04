import {Post, User} from '../../client/entities';

const dbGlobalKey = "__lokiDatabase";

export const { post, postToPosts, user, passport, clear } = (() => {
    let result: {
        post: LokiCollection<Post>;
        postToPosts: LokiCollection<{ parentId: number; childId: number; }>;
        user: LokiCollection<User>;
        passport: LokiCollection<{ id: number; login: string, password: string }>;
        clear: () => void;
    };

    if (!global[dbGlobalKey]) {
        const reference = require('./create');

        result = global[dbGlobalKey] = {
            post: reference.post,
            postToPosts: reference.postToPosts,
            user: reference.user,
            passport: reference.passport,
            clear: () => {
                post.clear();
                postToPosts.clear();
                user.clear();
                passport.clear();
                reference.db.clearChanges();
            }
        };
    } else {
        result = global[dbGlobalKey];
    }

    return result;
})();

export default { post, postToPosts, user, passport, clear };