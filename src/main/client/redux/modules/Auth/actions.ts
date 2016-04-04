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