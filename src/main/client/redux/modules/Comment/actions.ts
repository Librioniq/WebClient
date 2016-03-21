import { Comment } from '../../../entities';
import * as Api from '../../../api';
import * as Constants from './constants';

const api = new Api.Comment();


export function get(postId: number, id: number) {
    return {
        type: Constants.GET,
        payload: () => api.get(postId, id)
    };
}

export function list(postId: number) {
    return {
        type: Constants.LIST,
        payload: () => api.list(postId)
    };
}

export function create(postId: number, element: Comment) {
    return {
        type: Constants.CREATE,
        payload: () => api.post(postId, element)
    };
}

export function update(postId: number, element: Comment) {
    return {
        type: Constants.UPDATE,
        payload: () => api.put(postId, element)
    };
}

export function remove(postId: number, id: number) {
    return {
        type: Constants.DELETE,
        payload: () => api.delete(postId, id)
    };
}
