import {Status} from '../../middleware/Status';
import {assign} from 'lodash';
import * as Constants from './constants';


export function get(state = [], action) {
    if (Constants.GET === action.type && action.status === Status.SUCCESS) {
        return [
            ...state.filter(it => it.id !== action.user.id),
            action.user
        ];
    }

    return state;
}

export function failure(state = {}, action) {
    if (action.type === Constants.GET && action.status === Status.FAILURE) {
        return assign({}, state, { error: action.error });
    }

    return state;
}
