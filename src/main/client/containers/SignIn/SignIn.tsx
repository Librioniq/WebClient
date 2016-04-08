import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import Modules from '../../redux/modules';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

interface SignInProps extends RouteComponentProps<any, any> {
    authorize?: (login: string, password: string) => void;
}

@(connect<SignInProps, SignInProps, SignInProps>(
    () => ({}),
    dispatch => bindActionCreators({ authorize: Modules.Auth.Actions.authorize }, dispatch)
) as ClassDecorator)
export class SignIn extends React.Component<SignInProps, any> {
    public static contextTypes: React.ValidationMap<any> = {
        auth: React.PropTypes.object,
        user: React.PropTypes.object
    };

    public componentWillMount() {
        const { history: { push } } = this.props;
        const { auth } = this.context as any;

        if (!isEmpty(auth)) {
            push("/");
        }
    }

    public componentWillReceiveProps(props, context) {
        const { history: { push } } = props;
        const { auth } = context;

        if (!isEmpty(auth)) {
            push("/");
        }
    }

    public render() {
        return (
            <div>
                <Components.SignIn onSubmit = {(l, p) => this.onSubmit(l, p) } />
            </div>
        );
    }
    private onSubmit(login, password) {
        const { authorize } = this.props;

        authorize(login, password);
    }
}

export default SignIn;
