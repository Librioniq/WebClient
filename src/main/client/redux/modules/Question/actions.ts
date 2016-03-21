import {Question} from '../../../entities';
import * as Api from '../../../api';
import * as Constants from './constants';

const api = new Api.Question();


export function get(id: number) {
    return {
        type: Constants.GET,
        payload: () => api.get(id)
    };
}

export function list() {
    return {
        type: Constants.LIST,
        payload: () => api.list()
    };
}

export function create(element: Question) {
    return {
        type: Constants.CREATE,
        payload: () => api.post(element)
    };
}

export function update(element: Question) {
    return {
        type: Constants.UPDATE,
        payload: () => api.put(element)
    };
}

export function remove(id: number) {
    return {
        type: Constants.DELETE,
        payload: () => api.delete(id)
    };
}