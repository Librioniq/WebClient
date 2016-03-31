import {Status} from '../../middleware/Status';
import {assign, merge, union} from 'lodash';
import * as Constants from './constants';


export function list(state = [], action) {
    if (action.status === Status.SUCCESS && action.answers && action.type === Constants.LIST) {
        return [
            ...state.filter(it => !action.answers.some(that => that.id === it.id)),
            ...action.answers.map(it => merge(it, { parentId: action.payload.body.parentId }))
        ];
    }

    return state;
}

export function get(state = [], action) {
    if (Constants.GET === action.type && action.status === Status.SUCCESS) {
        return [
            ...state.filter(it => it.id !== action.answer.id),
            merge(action.answer, { parentId: action.payload.body.parentId })
        ];
    }

    return state;
}

export function create(state = [], action) {
    if (Constants.CREATE === action.type && action.status === Status.SUCCESS) {
        return [
            ...state,
            merge(action.answer, { parentId: action.payload.body.parentId })
        ];
    }

    return state;
}

export function update(state = [], action) {
    if (Constants.UPDATE === action.type && action.status === Status.SUCCESS) {
        return [
            ...state.filter(it => it.id !== action.answer.id),
            merge(action.answer, { parentId: action.payload.body.parentId })
        ];
    }

    return state;
}

export function remove(state = [], action) {
    if (Constants.DELETE === action.type && action.status === Status.SUCCESS) {
        return [
            ...state.filter(it => it.id !== action.payload.body.id)
        ];
    }

    return state;
}

export function failure(state = [], action) {
    if ([Constants.CREATE, Constants.DELETE, Constants.GET, Constants.LIST, Constants.UPDATE].some(type => type === action.type) && action.status === Status.FAILURE) {
        return assign({}, state, { error: action.error });
    }

    return state;
}
