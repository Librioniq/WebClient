import {PostApi} from './Post';
import {Question} from '../entities';


export class QuestionApi extends PostApi<Question> {
    constructor() {
        super("");
    }
}

export default QuestionApi;