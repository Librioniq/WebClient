import * as React from 'react';
const color:any = require('../css/color.css');

interface Tag {
    name: string;
}

interface TagArray {
    [index: number]: string;
    length: number;
}

interface TagsProps {
    tags: string[];
}

class Tags extends React.Component<TagsProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var classes = 'box ' + color.secondary;
        var tags = this.props.tags.map(tag => <div className={classes}>{tag}</div>);
        return (
            <div>
                {tags}
            </div>
        );
    }
}

export default Tags;
