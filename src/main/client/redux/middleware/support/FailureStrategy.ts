import { ResponseStrategy } from './ResponseStrategy';
import { Status } from './../Status';

export class FailureStrategy implements ResponseStrategy {
    public support(code: number) {
        return ((code / 10) >> 0) === 50;
    }

    public apply(response: IResponse) {
        return new Promise(it => it({
            status: Status.FAILURE,
            error: response.statusText
        }));
    }
}

export default new FailureStrategy();