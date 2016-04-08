import * as React from "react";
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import Modules from '../../redux/modules';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

interface AuthProps {
    auth?: any;
    user?: Entities.User;
    get?: (id) => void;
    restore?: (auth) => void;
}

@(connect<AuthProps, AuthProps, AuthProps>(
    ({auth, users}) => ({ auth, user: users.filter(it => it.id === auth.userId)[0] }),
    dispatch => bindActionCreators({ get: Modules.User.Actions.get, restore: Modules.Auth.Actions.restore }, dispatch)
) as ClassDecorator)
export class Auth extends React.Component<AuthProps, any> {
    public static childContextTypes: React.ValidationMap<any> = {
        auth: React.PropTypes.object,
        user: React.PropTypes.object
    };

    public componentWillMount() {
        const { restore } = this.props;
        const auth = Cookies.getJSON("auth");

        if (!isEmpty(auth)) {
            restore(auth);
        }
    }

    public componentWillReceiveProps(props: AuthProps) {
        const { auth, user, get } = props;

        if (isEmpty(user) && !isEmpty(auth)) {
            Cookies.set("auth", auth, { path: "" });

            get(auth.userId);
        } else if (isEmpty(auth) && isEmpty(Cookies.get("auth"))) {
            Cookies.remove("auth");
        }
    }

    public getChildContext() {
        const { auth, user } = this.props;

        return { auth, user };
    }

    public render() {
        const { auth, user, children } = this.props;
        return (
            <div>
                {(isEmpty(auth) || !isEmpty(user)) && children}
            </div>
        );
    }
}

export default Auth;
