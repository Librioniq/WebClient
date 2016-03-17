import {PostApi} from './Post';
import {Question} from '../entities';


export class QuestionApi extends PostApi<Question> {
    constructor() {
        super("http://localhost:8082/api/questions");
    }
}

export default QuestionApi;