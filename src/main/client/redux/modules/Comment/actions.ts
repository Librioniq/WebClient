import { Comment } from '../../../entities';
import * as Api from '../../../api';
import * as Constants from './constants';

const api = new Api.Comment();


export function get(parentId: number, id: number) {
    return {
        type: Constants.GET,
        payload: {
            request: () => api.get(parentId, id),
            body: { id, parentId }
        }
    };
}

export function list(parentId: number) {
    return {
        type: Constants.LIST,
        payload: {
            request: () => api.list(parentId),
            body: { parentId }
        }
    };
}

export function create(comment: Comment) {
    return {
        type: Constants.CREATE,
        payload: {
            request: () => api.post(comment),
            body: { comment }
        }
    };
}

export function update(parentId: number, comment: Comment) {
    return {
        type: Constants.UPDATE,
        payload: {
            request: () => api.put(parentId, comment),
            body: { comment, parentId }
        }
    };
}

export function remove(parentId: number, id: number) {
    return {
        type: Constants.DELETE,
        payload: {
            request: () => api.delete(parentId, id),
            body: { id, parentId }
        }
    };
}
