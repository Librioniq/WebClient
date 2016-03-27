import {assign, omit} from 'lodash';
import * as Entities from '../../client/entities';
import {Post} from './Post';


export class Answer extends Post<Entities.Answer> {
    public list(parentId: number): Entities.Answer[] {
        return super.list(parentId, "ANSWER");
    }

    public add(parentId: number, entity: Entities.Answer): Entities.Answer {
        return super.add(parentId, assign({}, entity, { type: "ANSWER" }) as Entities.Answer);
    }
}