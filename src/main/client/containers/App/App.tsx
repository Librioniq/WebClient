import * as React from 'react';
import {Link} from 'react-router';
import {NavBar} from '../../components';
import {DevTools} from '../../containers';

interface AppProps extends React.Props<App> {
}

export class App extends React.Component<AppProps, void> {
    public render() {
        return (
            <section className="main">
                <NavBar>
                    <Link to = {"/questions/"}>Questions</Link>
                    <Link to = {"/questions/ask"}>Ask Question</Link>
                </NavBar>
                <div>
                    {this.props.children}
                </div>
                <DevTools/>
            </section>
        );
    }
}

export default App;
