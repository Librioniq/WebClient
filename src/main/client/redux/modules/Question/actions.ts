import {Question} from '../../../entities';
import * as Api from '../../../api';
import * as Constants from './constants';

const api = new Api.Question();


export function get(id: number) {
    return {
        type: Constants.GET,
        payload: {
            request: () => api.get(id),
            body: { id }
        }
    };
}

export function list() {
    return {
        type: Constants.LIST,
        payload: {
            request: () => api.list(),
            body: {}
        }
    };
}

export function create(question: Question) {
    return {
        type: Constants.CREATE,
        payload: {
            request: () => api.post(question),
            body: { question }
        }
    };
}

export function update(question: Question) {
    return {
        type: Constants.UPDATE,
        payload: {
            request: () => api.put(question),
            body: { question }
        }
    };
}

export function remove(id: number) {
    return {
        type: Constants.DELETE,
        payload: {
            request: () => api.delete(id),
            body: { id }
        }
    };
}