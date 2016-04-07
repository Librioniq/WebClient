import * as Cookies from 'js-cookie';
import {isEmpty} from 'lodash';
import {Status} from './Status';


export default ({}) => next => action => { // can be used with sotre like store=>next=>actoion=>...
    const regex = /^api\/AUTH:POST?$/i;
    const isAuthAPICall = regex.test(action.type);

    if (isAuthAPICall && action.status === Status.SUCCESS) {
        Cookies.set("auth", action.auth, { path: "" });

        return next(action);
    } else {
        const auth = Cookies.getJSON("auth");

        if (!isEmpty(auth)) {
            next({ type: "api/AUTH:POST", status: Status.SUCCESS, auth });
        }

        return next(action);
    }
}
