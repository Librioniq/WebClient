import * as React from "react";

import { CommentModel } from '../../models/comment';

const styles: any = require('./comment.css');
const color: any = require('../../theme/color.css');

export class Comment extends React.Component<CommentModel, void> {

    constructor(props) {
        super(props);
    }

    public render() {
        const author = this.props.author || 'KobeJohn',
            content = this.props.content || 'If you come back to this, maybe you should change the accepted answer from diaspora.',
            date = this.props.date || 'Feb 5 12 at 13:35';
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
