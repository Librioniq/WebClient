import * as React from 'react';
import { Link } from 'react-router';
import { NavBar } from '../../components';
import { DevTools, UserProvider } from '../../containers';

const css: any = require('./css/App.scss');

interface AppProps extends React.Props<App> {
}

export class App extends React.Component<AppProps, any> {
    public render() {
        return (
            <section className="main">
                <UserProvider>
                    <NavBar>
                        <Link to = {"/questions/"}>Questions</Link>
                        <Link to = {"/questions/ask"}>Ask Question</Link>
                    </NavBar>
                    <div className={css.test}>
                        {this.props.children}
                    </div>
                </UserProvider>
                <DevTools/>
            </section>
        );
    }
}

export default App;
