import * as React from 'react';
import { Link } from 'react-router';
import { NavBar } from '../../components';
import { DevTools } from '../../containers';
import { isEmpty } from 'lodash';

const css: any = require('./App.scss');

interface AppProps extends React.Props<App> {
}

export class App extends React.Component<AppProps, any> {
    public static contextTypes: React.ValidationMap<any> = {
        auth: React.PropTypes.object,
        user: React.PropTypes.object
    };

    public render() {
        return (
            <section className="main">
                <NavBar>
                    <Link to = { "/questions/" }>Questions</Link>
                    <Link to = { "/questions/ask" }>Ask Question</Link>
                    { this.renderAuth() }
                </NavBar>
                <div className = { css.test }>
                    { this.props.children }
                </div>
                <DevTools/>
            </section>
        );
    }

    private renderAuth() {
        const { auth } = this.context as any;
        const element = isEmpty(auth) ?
            (<Link to = { "/signin" }>Sign In</Link>) :
            (<Link to = { "/signout" }>Sign Out</Link>);

        return element;
    }
}

export default App;
