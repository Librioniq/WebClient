import * as React from 'react';
import {NavBar} from '../../components';
import {DevTools} from '../../containers';

const css :any = require('./App.scss');

interface AppProperties extends React.Props<App> {
}

export class App extends React.Component<AppProperties, void> {
    public render() {
        return (
            <section className={css.main}>
                <NavBar />
                <div className={css.container}>
                    {this.props.children}
                </div>
                <DevTools />
            </section>
        );
    }
}

export default App;
