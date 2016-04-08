import {Status} from '../../middleware/Status';
import {assign} from 'lodash';
import * as Constants from './constants';


export function authorize(state = {}, action) {
    if (action.status === Status.SUCCESS && action.auth && action.type === Constants.AUTH) {
        return assign({}, state, action.auth);
    }

    return state;
}

export function signOut(state = {}, action) {
    if (action.type === Constants.SIGN_OUT) {
        return {};
    }

    return state;
}

export function failure(state = {}, action) {
    if (action.type === Constants.AUTH && action.status === Status.FAILURE) {
        return assign({}, state, { error: action.error });
    }

    return state;
}
