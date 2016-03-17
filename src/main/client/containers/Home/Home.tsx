import * as React from "react";
import { Editor } from "../../components";

interface HomeProperties extends React.Props<Home> {
}

export class Home extends React.Component<HomeProperties, void> {
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
