import { Model } from '../Model';
import Api from '../api';

const GET = 'api/COMMENT:GET';
const LIST = 'api/COMMENTS:LIST';
const CREATE = 'api/COMMENT:POST';
const UPDATE = 'api/COMMENT:PUT';
const DELETE = 'api/COMMENT:DELETE';

const api = new Api();

export function get(parentId: number, id: number) {
    return {
        type: GET,
        payload: {
            request: () => api.get(parentId, id),
            body: { id, parentId }
        }
    };
}

export function list(parentId: number) {
    return {
        type: LIST,
        payload: {
            request: () => api.list(parentId),
            body: { parentId }
        }
    };
}

export function create(parentId: number, comment: Model) {
    return {
        type: CREATE,
        payload: {
            request: () => api.post(parentId, comment),
            body: { comment, parentId }
        }
    };
}

export function update(parentId: number, comment: Model) {
    return {
        type: UPDATE,
        payload: {
            request: () => api.put(parentId, comment),
            body: { comment, parentId }
        }
    };
}

export function remove(parentId: number, id: number) {
    return {
        type: DELETE,
        payload: {
            request: () => api.delete(parentId, id),
            body: { id, parentId }
        }
    };
}
