import * as React from "react";
import { assign } from 'lodash';

interface SignInProps {
    onSubmit?: (login: string, password: string) => void;
}

interface SignInState {
    login: string;
    password: string;
}

export class SignIn extends React.Component<SignInProps, SignInState> {
    public componentWillMount() {
        this.state = { login: "", password: "" };
    }

    public render() {
        const { login, password } = this.state;

        return (
            <div>
                <form action = { "#" }>
                    <div className="input-group">
                        <span className = { "input-group-addon" }>Login</span>
                        <input type = { "text" } className = { "form-control" } value = { login }  onChange = { e => this.onLoginChange((e.currentTarget as HTMLInputElement).value) } aria-label = { "Login" }/>
                    </div>
                    <div className="input-group">
                        <span className = { "input-group-addon" }>Password</span>
                        <input type = { "password" } className = { "form-control" } value = { password }  onChange = { e => this.onPasswordChange((e.currentTarget as HTMLInputElement).value) } aria-label = { "Password" }/>
                    </div>
                    <button className = {"btn btn-default"} type = {"button"} onClick = {() => this.onSubmit() }>Save</button>
                </form>
            </div>
        );
    }

    private onLoginChange(login: string) {
        this.setState(assign({}, this.state, { login }) as SignInState);
    }

    private onPasswordChange(password: string) {
        this.setState(assign({}, this.state, { password }) as SignInState);
    }

    private onSubmit() {
        const { onSubmit } = this.props;
        const { login, password } = this.state;

        if (login && password) {
            onSubmit(login, password);
        }
    }
}

export default SignIn;
