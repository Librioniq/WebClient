import { Status } from '../../utils/Status';
import { assign, merge } from 'lodash';

const GET = 'api/COMMENT:GET';
const LIST = 'api/COMMENTS:LIST';
const CREATE = 'api/COMMENT:POST';
const UPDATE = 'api/COMMENT:PUT';
const DELETE = 'api/COMMENT:DELETE';

export function list(state = [], action) {
    if (action.status === Status.SUCCESS && action.comments && action.type === LIST) {
        return [
            ...state.filter(it => !action.comments.some(that => that.id === it.id)),
            ...action.comments.map(it => merge(it, { parentId: action.payload.body.parentId }))
        ];
    }

    return state;
}

export function get(state = [], action) {
    if (GET === action.type && action.status === Status.SUCCESS) {
        return [
            ...state.filter(it => it.id !== action.comment.id),
            merge(action.comment, { parentId: action.payload.body.parentId })
        ];
    }

    return state;
}

export function create(state = [], action) {
    if (CREATE === action.type && action.status === Status.SUCCESS) {
        return [
            ...state,
            merge(action.comment, { parentId: action.payload.body.parentId })
        ];
    }

    return state;
}

export function update(state = [], action) {
    if (UPDATE === action.type && action.status === Status.SUCCESS) {
        return [
            ...state.filter(it => it.id !== action.comment.id),
            merge(action.comment, { parentId: action.payload.body.parentId })
        ];
    }

    return state;
}

export function remove(state = [], action) {
    if (DELETE === action.type && action.status === Status.SUCCESS) {
        return [
            ...state.filter(it => it.id !== action.payload.body.id)
        ];
    }

    return state;
}

export function failure(state = [], action) {
    if ([CREATE, DELETE, GET, LIST, UPDATE].some(type => type === action.type) && action.status === Status.FAILURE) {
        return assign({}, state, { error: action.error });
    }

    return state;
}
