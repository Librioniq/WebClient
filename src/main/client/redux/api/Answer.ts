import {PostApi} from './Post';
import {Answer} from '../entities';


export class AnswerApi extends PostApi<Answer> {
    constructor() {
        super("");
    }
}

export default AnswerApi;