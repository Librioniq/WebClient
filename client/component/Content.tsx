import * as React from "react";

import ParentProperties from './properties/ParentProperties';

interface ContentProperties extends ParentProperties<any, any> {
}

class Content extends React.Component<ContentProperties, void>{
    render() {
        return (
            <div className="row">
            {this.props.children}
                </div>
        );
    }
}

export default Content;