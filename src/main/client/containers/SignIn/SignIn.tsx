import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { Actions } from '../../redux/modules/Auth';
import { User } from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

interface SignInProps extends RouteComponentProps<any, any> {
    authorize?: (login: string, password: string) => void;
    auth?: User;
}

@(connect<SignInProps, SignInProps, SignInProps>(
    s => ({ auth: s.auth }),
    dispatch => bindActionCreators({ authorize: Actions.authorize }, dispatch)
) as ClassDecorator)
export class SignIn extends React.Component<SignInProps, any> {
    public componentWillMount() {
        const { auth, history: { push } } = this.props;

        if (!isEmpty(auth)) {
            push("/");
        }
    }

    public componentWillReceiveProps(props) {
        const { auth, history: { push } } = props;

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
