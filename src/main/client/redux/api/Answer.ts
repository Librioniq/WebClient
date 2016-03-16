import {PostApi} from './Post';
import {Answer} from '../entities';


export class AnswerApi extends PostApi<Answer> {
    constructor() {
        super("http://localhost:8082/api/answer");
    }
}

export default AnswerApi;