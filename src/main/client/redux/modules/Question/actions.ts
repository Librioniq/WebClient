import {Question} from '../../../entities';
import * as Api from '../../../api';
import * as Constants from './constants';

const questionApi = new Api.Question();


export function getQuestion(id: number) {
    return {
        type: Constants.GET,
        payload: () => questionApi.get(id)
    };
}

export function listQuestion() {
    return {
        type: Constants.LIST,
        payload: () => questionApi.list()
    };
}

export function createQuestion(element: Question) {
    return {
        type: Constants.CREATE,
        payload: () => questionApi.post(element)
    };
}

export function updateQuestion(element: Question) {
    return {
        type: Constants.UPDATE,
        payload: () => questionApi.put(element)
    };
}

export function deleteQuestion(id: number) {
    return {
        type: Constants.DELETE,
        payload: () => questionApi.delete(id)
    };
}
