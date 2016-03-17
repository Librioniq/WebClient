import * as React from 'react';

export class NavBar extends React.Component<{}, void> {
    public render() {
        const css :any = require('./NavBar.scss');
        const navigationClass = 'navbar navbar-default ' + css.main;

        return (
            <nav className={navigationClass} role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#/">
                            <span className="navbar-version">v0.0.1</span>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
