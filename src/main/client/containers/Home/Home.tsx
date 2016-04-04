import * as React from "react";

interface HomeProps extends React.Props<Home> {
}

export class Home extends React.Component<HomeProps, any> {
    public render() {
        return (
            <div className="container">
                <p>Home</p>
                {this.props.children}
            </div>
        );
    }
}

export default Home;
