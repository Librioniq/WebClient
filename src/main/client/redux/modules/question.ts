import {Question} from '../../entities';
import * as Api from '../../api';
import {Status} from '../middleware/Status';
import {assign} from 'lodash';

const GET_QUESTION = 'api/QUESTION:GET';
const LIST_QUESTIONS = 'api/QUESTIONS:LIST';
const CREATE_QUESTION = 'api/QUESTION:POST';
const UPDATE_QUESTION = 'api/QUESTION:PUT';
const DELETE_QUESTION = 'api/QUESTION:DELETE';

interface QuestionState {
    list: Array<Question>;
    one: Question;
    error?: string;
}

const initialState: QuestionState = {
    list: [],
    one: {
        title: "",
        content: ""
    },
    error: ""
};
const questionApi = new Api.Question();


// Updates an entity cache in response to any action with response.entities.
export function list(state: QuestionState = initialState, action): QuestionState {
    if (action.status === Status.SUCCESS && action.questions && action.type === LIST_QUESTIONS) {
        return assign({}, state, { list: [].concat(...action.questions).concat(...state.list), error: "" }) as QuestionState;
    }

    return state;
}

export function failure(state: QuestionState = initialState, action) {
    if ([GET_QUESTION, LIST_QUESTIONS, CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION].some(type => type === action.type) && action.status === Status.FAILURE) {
        return assign({}, state, { error: action.error }) as QuestionState;
    }

    return state;
}

export function get(state: QuestionState = initialState, action) {
    if ([GET_QUESTION, LIST_QUESTIONS, CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION].some(type => type === action.type) && action.status === Status.FAILURE) {
        return assign({}, state, { error: action.error }) as QuestionState;
    }

    return state;
}

export function create(state: QuestionState = initialState, action) {
    if ([GET_QUESTION, LIST_QUESTIONS, CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION].some(type => type === action.type) && action.status === Status.FAILURE) {
        return assign({}, state, { error: action.error }) as QuestionState;
    }

    return state;
}

export function remove(state: QuestionState = initialState, action) {
    if (type => type === action.type && action.status === Status.FAILURE) {
        return assign({}, state, { error: action.error }) as QuestionState;
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

export default list;
