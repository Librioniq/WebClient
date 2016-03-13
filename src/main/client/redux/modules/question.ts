import {Question} from '../entities';
import {merge} from 'lodash';

const GET_QUESTION = 'api/QUESTIONS:GET';
const LIST_QUESTIONS = 'api/QUESTIONS:LIST';
const CREATE_QUESTION = 'api/QUESTIONS:POST';
const UPDATE_QUESTION = 'api/QUESTIONS:PUT';
const DELETE_QUESTION = 'api/QUESTIONS:DELETE';

interface EditorState {
    content: string;
}

const initialState: EditorState = {
    content: ""
};


// Updates an entity cache in response to any action with response.entities.
export function reducer(state = { users: {}, repos: {} }, action) {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities);
    }

    return state;
}

export function getQuestion(id: number) {
    return {
        type: GET_QUESTION,
        id
    };
}

export function listQuestion() {
    return {
        type: LIST_QUESTIONS
    };
}

export function createQuestion(element: Question) {
    return {
        type: CREATE_QUESTION,
        element
    };
}

export function updateQuestion(element: Question) {
    return {
        type: UPDATE_QUESTION,
        element
    };
}

export function deleteQuestion(id: number) {
    return {
        type: DELETE_QUESTION,
        id
    };
}

export default reducer;
