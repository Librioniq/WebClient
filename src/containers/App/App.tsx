import * as React from 'react';
import {NavBar} from '../../components';
import {DevTools} from '../../containers';

const styles = require('./App.scss');

interface AppProperties extends React.Props<App> {
}

export class App extends React.Component<AppProperties, void> {
    public render() {
        return (
            <section className={styles.main}>
                <NavBar/>
                <div>
                    {this.props.children}
                </div>
                <DevTools/>
            </section>
        );
    }
}

export default App;
