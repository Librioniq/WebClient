import {assign} from 'lodash';
import * as Entities from '../../client/entities';
import {Post} from './Post';


export class Comment extends Post<Entities.Comment> {
    public list(parentId): Entities.Comment[] {
        return super.list(parentId, "COMMENT");
    }

    public add(entity: Entities.Comment): Entities.Comment {
        return super.add(assign({}, entity, { type: "COMMENT" }) as Entities.Comment);
    }

    public findOne(id: number, parentId: number): Entities.Comment {
        return super.findOne(id, parentId);
    }
}
