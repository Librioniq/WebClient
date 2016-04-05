import {merge} from 'lodash';
import {Status} from './Status';


export default ({}) => next => action => { // can be used with sotre like store=>next=>actoion=>...
    const regex = /^RESTORE\/AUTH?$/i;
    const isRestoreCall = regex.test(action.type);

    if (!isRestoreCall) {
        return next(action);
    }

    return next(merge(action, { type: "api/AUTH:POST", status: Status.SUCCESS }));
}
