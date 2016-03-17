import {Post} from './Post';
import* as Entities from '../entities';


export abstract class Answer extends Post<Entities.Answer> {
    constructor() {
        super("http://localhost:8082/api/questions/:questionId/answers");
    }
}

export default Answer;
