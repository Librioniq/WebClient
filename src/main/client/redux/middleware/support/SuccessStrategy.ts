import { ResponseStrategy } from './ResponseStrategy';
import { Status } from './../Status';
import { push } from 'react-router-redux';

export class SuccessStrategy implements ResponseStrategy {
    private regex = /^api\/(\w+|\d+):(GET|POST|PUT|DELETE|LIST)?$/i;

    public support(code: number) {
        return ((code / 10) >> 0) === 20;
    }

    public apply(response: IResponse, action: any, dispatch: any) {
        return response.json().then(data => {
            const {1: name} = this.regex.exec(action.type);

            if (response.status === 201 && name.match(/question/i)) {
                dispatch(push(`/questions/${data.id}`));
            }

            return {
                [name.toLocaleLowerCase()]: data,
                status: Status.SUCCESS
            };
        });
    }
}

export default new SuccessStrategy();