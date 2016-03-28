import {assign, omit, isEmpty} from 'lodash';
import {post, postToPosts} from '../database';
import * as Entities from '../../client/entities';

type PostType = "QUESTION" | "ANSWER" | "COMMENT";

const lokiKey = "$loki";
const omitKeys = [lokiKey, "meta", "type"];

//todo: add checking of relationships

export class Post<T extends Entities.Post> {
    public list(value?: any, postType?: PostType): T[] {
        let query;

        if (postType) {
            const ids = postToPosts.find({ parentId: value }).map(it => it.childId);
            query = { $and: [{ type: postType }, { id: { $in: ids } }] };
        } else {
            query = { type: value };
        }

        return post.find(query).map(it => omit(it, omitKeys)) as any;
    }

    public add(value: any, entity?: T): T {
        let result = assign({}, entity ? entity : value) as T;

        result = post.insert(result) as T;
        result.id = result[lokiKey];
        result = post.update(result) as T;

        if (typeof value === typeof 1) {
            postToPosts.insert({ parentId: value, childId: result.id });
        }

        return omit(result, omitKeys) as T;
    }

    public update(entity: T): T {
        const foundEntity = post.findOne({ id: entity.id });

        if (foundEntity) {
            return omit(post.update(assign({}, foundEntity, entity) as T), omitKeys) as T;
        }

        throw `There is no entity with given id : ${entity.id}`;
    }

    public findOne(id?: number, parentId?: number): T {
        if (parentId !== undefined && isEmpty(postToPosts.findOne({ parentId, childId: id }))) {
            // throw `There is no entity with given id : ${id} and related parentId : ${parentId}`;
            return;
        }

        return omit(post.findOne({ id }), omitKeys) as T;
    }

    public remove(id: number): T {
        const result = post.findOne({ id }) as T;

        if (result) {
            post.remove(result);
            postToPosts.removeWhere(it => it.childId === id || it.parentId === id);
        }

        return omit(result, omitKeys) as T;
    }
}