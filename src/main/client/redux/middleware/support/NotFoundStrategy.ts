import { ResponseStrategy } from './ResponseStrategy';
import { Status } from './../Status';
import { push } from 'react-router-redux';

export class NotFoundStrategy implements ResponseStrategy {
    public support(code: number) {
        return code === 404;
    }

    public apply(response: IResponse, {}, dispatch) {
        return new Promise(it => {
            dispatch(push(`/~${location.pathname}`));

            it({
                status: Status.FAILURE,
                error: response.statusText
            });
        });
    }
}

export default new NotFoundStrategy();