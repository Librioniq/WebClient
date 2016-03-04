import * as React from "react";

import ParentProperties from './properties/ParentProperties';

interface ContentProperties extends ParentProperties<any, any> {
}

class Content extends React.Component<ContentProperties, void>{
    render() {
        return (
            <div>
              {this.props.children}
            </div>
        );
    }
}

export default Content;
