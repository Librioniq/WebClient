import {Question} from '../../entities';
import {Question as Api} from '../../api';

const GET_QUESTION = 'api/QUESTIONS:GET';
const LIST_QUESTIONS = 'api/QUESTIONS:LIST';
const CREATE_QUESTION = 'api/QUESTIONS:POST';
const UPDATE_QUESTION = 'api/QUESTIONS:PUT';
const DELETE_QUESTION = 'api/QUESTIONS:DELETE';

const questionApi = new Api();


// Updates an entity cache in response to any action with response.entities.
export function reducer(state = [], action) {
    if (action.status === 1 && action.questions) {
        return [].concat(...action.questions);
    }

    return state;
}

export function getQuestion(id: number) {
    return {
        type: GET_QUESTION,
        payload: () => questionApi.get(id)
    };
}

export function listQuestion() {
    return {
        type: LIST_QUESTIONS,
        payload: () => questionApi.list()
    };
}

export function createQuestion(element: Question) {
    return {
        type: CREATE_QUESTION,
        payload: () => questionApi.post(element)
    };
}

export function updateQuestion(element: Question) {
    return {
        type: UPDATE_QUESTION,
        payload: () => questionApi.put(element)
    };
}

export function deleteQuestion(id: number) {
    return {
        type: DELETE_QUESTION,
        payload: () => questionApi.delete(id)
    };
}

export default reducer;
