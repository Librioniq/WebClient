import * as Api from '../../../api';
import * as Constants from './constants';

const api = new Api.Auth();


export function authorize(login: string, password: string) {
    return {
        type: Constants.AUTH,
        payload: {
            request: () => api.authorize(login, password),
            body: { login, password }
        }
    };
}

export function signOut() {
    return {
        type: Constants.SIGN_OUT
    };
}

export function restore(auth: any) {
    return {
        type: Constants.RESTORE,
        auth
    };
}