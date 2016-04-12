import { assign } from 'lodash';
import { Status } from './Status';
import { ResponseStrategy } from './support';
import { find } from 'lodash';


export default ({dispatch}) => next => action => { // can be used with sotre like store=>next=>actoion=>...
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

    return (action.payload.request() as Promise<IResponse>).then(
        response => (find(ResponseStrategy, it => it.support(response.status)) || ResponseStrategy[0]).apply(response, action, dispatch),
        error => ResponseStrategy[0].apply(error, action, dispatch)
    ).then(it => next(actionWith(it)));
}
