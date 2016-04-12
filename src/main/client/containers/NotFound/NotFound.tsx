import * as React from 'react';
import { RouteComponentProps } from 'react-router';


interface NotFoundProps extends RouteComponentProps<any, any> {
}

export class NotFound extends React.Component<NotFoundProps, any> {
    public static contextTypes: React.ValidationMap<any> = {
        auth: React.PropTypes.object,
        user: React.PropTypes.object
    };

    public render() {
        return (
            <div className = { "jumbotron" }>
                <h1>404</h1>
                <p>There is no page for current adress</p>
            </div>
        );
    }
}

export default NotFound;
