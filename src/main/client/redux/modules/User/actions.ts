import * as Api from '../../../api';
import * as Constants from './constants';

const api = new Api.User();


export function get(id: number) {
    return {
        type: Constants.GET,
        payload: {
            request: () => api.get(id),
            body: { id }
        }
    };
}