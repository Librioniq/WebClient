import { Answer } from '../../../entities';
import * as Api from '../../../api';
import * as Constants from './constants';

const api = new Api.Answer();


export function get(questionId: number, id: number) {
    return {
        type: Constants.GET,
        payload: () => api.get(questionId, id)
    };
}

export function list(questionId: number) {
    return {
        type: Constants.LIST,
        payload: () => api.list(questionId)
    };
}

export function create(questionId: number, element: Answer) {
    return {
        type: Constants.CREATE,
        payload: () => api.post(questionId, element)
    };
}

export function update(questionId: number, element: Answer) {
    return {
        type: Constants.UPDATE,
        payload: () => api.put(questionId, element)
    };
}

export function remove(questionId: number, id: number) {
    return {
        type: Constants.DELETE,
        payload: () => api.delete(questionId, id)
    };
}