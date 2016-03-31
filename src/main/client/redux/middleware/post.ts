import {assign} from 'lodash';
import {Status} from './Status';


export default () => next => action => { // can be used with sotre like store=>next=>actoion=>...
    const regex = /^api\/(\w+|\d+):(GET|POST|PUT|DELETE|LIST)?$/i;
    const isAPICall = regex.test(action.type);

    if (!isAPICall) {
        return next(action);
    }

    if (!action.payload || typeof action.payload.request !== typeof Function) {
        throw new Error(`Expected Function but given '${typeof action.action}'`);
    }

    function actionWith(data) {
        const finalAction = assign({}, action, data);

        return finalAction;
    }

    next(actionWith({ status: Status.REQUEST }));

    return (action.payload.request() as Promise<IResponse>)
        .then(response => (response.status === 200 || response.status === 201) ? response.json().then(data => next(actionWith({
            [regex.exec(action.type)[1].toLocaleLowerCase()]: data,
            status: Status.SUCCESS
        }))) : next(actionWith({ status: Status.SUCCESS })),
        error => next(actionWith({
            status: Status.FAILURE,
            error: error.message || 'Something bad happened'
        })));
}
