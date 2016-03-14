import {assign} from 'lodash';

enum Status {
    REQUEST, SUCCESS, FAILURE
}

export default store => next => action => {
    const regex = /^(api)\/+(\w+|\d+)+:(GET|POST|PUT|DELETE|LIST)+?$/i;
    const isAPICall = regex.test(action.type);

    console.log("entered");

    if (!isAPICall) {
        return next(action);
    }

    if (typeof action.payload !== typeof Function) {
        throw new Error(`Expected Function but given '${typeof action.action}'`);
    }

    function actionWith(data) {
        const finalAction = assign({}, action, data);

        return finalAction;
    }

    next(actionWith({ status: Status.REQUEST }));

    return (action.payload() as Promise<IResponse>)
        .then(response => response.json(), error => next(actionWith({
            status: Status.FAILURE,
            error: error.message || 'Something bad happened'
        })))
        .then(data => next(actionWith({
            [`${regex.exec(action.type)[2].toLocaleLowerCase()}`]: data,
            status: Status.SUCCESS
        })));
}