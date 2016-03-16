import * as React from "react";

import * as Entities from '../../entities';

const styles: any = require('./Comment.scss');

export class Comment extends React.Component<Entities.Comment, void> {
    public render() {
        const author = this.props.createdBy || 'KobeJohn',
            content = this.props.content || 'If you come back to this, maybe you should change the accepted answer from diaspora.',
            date = this.props.createdDate || 'Feb 5 12 at 13:35';
        return (
            <div className={styles.comment}>
                <span>{content} - </span>
                <a href="#" className={styles.link}>{author}</a>
                <span className={styles.helper}> {date}</span>
            </div>
        );
    }
}

export default Comment;
