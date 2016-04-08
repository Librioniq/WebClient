import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modules from '../../redux/modules';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

interface SignOutProps extends RouteComponentProps<any, any> {
    signOut?: () => void;
}

@(connect<SignOutProps, SignOutProps, SignOutProps>(
    () => ({}),
    dispatch => bindActionCreators({ signOut: Modules.Auth.Actions.signOut }, dispatch)
) as ClassDecorator)
export class SignOut extends React.Component<SignOutProps, any> {
    public componentWillMount() {
        const { history: { push }, signOut } = this.props;

        signOut();
        push("/");
    }

    public componentWillReceiveProps() {
        const { history: { push }, signOut } = this.props;

        signOut();
        push("/");
    }

    public render() {
        return (
            <div>
            </div>
        );
    }
}

export default SignOut;
