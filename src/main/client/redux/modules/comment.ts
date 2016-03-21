import * as Api from '../../api';
import * as Entities from '../../entities';
import { Status } from '../middleware/Status';
import { assign } from 'lodash';

const CREATE_COMMENT = 'api/COMMENT:POST';
const DELETE_COMMENT = 'api/COMMENT:DELETE';

const api = new Api.Comment();

export function create(state: Entities.Comment[] = [], action): Entities.Comment[] {
    if (action.type === CREATE_COMMENT) {
        return [
            action.comment,
            ...state
        ]
    }

    return state;
};

export function edit(state = [], action) {
    return state.map(comment =>
        comment.id === action.id
            ? assign({}, comment, {text: action.text})
            : comment
        )
};

export function remove(state: Entities.Comment[], action): Entities.Comment[] {
    //TODO
    if (action.type === DELETE_COMMENT && action.status === Status.SUCCESS) {
        return state.filter(comment =>
            comment.id !== action.payload.id
        );
    }

    return state;
}

export function createComment(comment: Entities.Comment) {
    return {
        type: CREATE_COMMENT,
        comment: comment,
        payload: () => api.post(0, comment)
    }
}

export function deleteComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment: comment,
        payload: () => api.delete(0, comment.id)
    }
}

export default create;
