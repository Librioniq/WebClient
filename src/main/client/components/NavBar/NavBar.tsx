import * as React from 'react';
import * as classnames from 'classnames';

interface NavBarProps extends React.Props<NavBar> { }

interface NavBarState {
    expanded: boolean;
}

export class NavBar extends React.Component<NavBarProps, NavBarState> {
    public componentWillMount() {
        this.state = { expanded: false };
    }

    public componentWillReceiveProps() {
        this.setState({ expanded: false });
    }

    public render() {
        const { expanded } = this.state;

        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button onClick = { () => this.toggle() } type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#/">
                            <span className="navbar-version">v0.0.1</span>
                        </a>
                    </div>
                    <div id = { "#navbar-collapse" } className = { classnames({ collapse: !expanded }, "navbar-collapse") }>
                        <ul className = { "nav navbar-nav navbar-right" }>
                            {(this.props.children as []).map(it => (<li ui-sref-active="active">{it}</li>)) }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    private toggle(): void {
        const { expanded } = this.state;

        this.setState({ expanded: !expanded });
    }
}

export default NavBar;