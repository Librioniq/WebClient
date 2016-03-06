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
        return (
            <div>
                this.props.tags.map(tag => <div className='box {color.secondary}'>tag</div>)
            {this.props.tags}</div>
        );
    }
}

export default Tags;
