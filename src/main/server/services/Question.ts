import * as Entities from '../../client/entities';
import {assign} from 'lodash';
import {Post} from './Post';


export class Question extends Post<Entities.Question> {
    public list(): Entities.Question[] {
        return super.list("QUESTION");
    }

    public add(entity: Entities.Question): Entities.Question {
        return super.add(assign({}, entity, { type: "QUESTION" }));
    }

    public findOne(id: number): Entities.Question {
        return super.findOne(id);
    }
}