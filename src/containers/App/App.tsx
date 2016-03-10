import * as React from 'react';
import {NavBar} from '../../components';

const styles = require('./App.scss');

interface AppProperties extends React.Props<App> {
}

export class App extends React.Component<AppProperties, void> {
    public render() {
        console.log(this.props.children);
        return (
            <section className={styles.main}>
                <NavBar/>
                <div>
                    {this.props.children}
                </div>
            </section>
        );
    }
}

export default App;
