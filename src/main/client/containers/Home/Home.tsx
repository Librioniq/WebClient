import * as React from "react";

interface HomeProperties extends React.Props<Home> {
}

export class Home extends React.Component<HomeProperties, any> {
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
