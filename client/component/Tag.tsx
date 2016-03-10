import * as React from 'react';
const color:any = require('../css/color.css');

interface TagProps {
    name: string;
}

class Tag extends React.Component<TagProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var classes = ['box', color.secondary, color.link].join(' ');
        return (
            <a href="#" className={classes}>{this.props.name}</a>
        );
    }
}

export default Tag;
