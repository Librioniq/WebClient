import * as React from "react";

import * as Entities from '../../entities';

const styles: any = require('./comment.css');
const color: any = require('../../theme/color.css');

export class Comment extends React.Component<Entities.Comment, void> {

    constructor(props) {
        super(props);
    }

    public render() {
        const author = this.props.createdBy || 'KobeJohn',
            content = this.props.content || 'If you come back to this, maybe you should change the accepted answer from diaspora.',
            date = this.props.createdDate || 'Feb 5 12 at 13:35';
        return (
            <div className={styles.comment}>
                <span>{content} - </span>
                <a href="#" className={color.link}>{author}</a>
                <span className={color.helper}> {date}</span>
            </div>
        );
    }
}

export default Comment;
