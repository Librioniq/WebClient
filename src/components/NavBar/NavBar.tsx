import * as React from 'react';

export class NavBar extends React.Component<{}, void> {
    public render() {
        return (
            <nav className="navbar navbar-default" role="navigation">
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