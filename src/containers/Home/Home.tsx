import * as React from "react";
import { Editor } from "../../components";

export class Home extends React.Component<{}, void> {
    public render() {
        return (
            <div className="container">
                <p>Home</p>
                <Editor/>
            </div>
        );
    }
}

export default Home;