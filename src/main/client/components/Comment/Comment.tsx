import * as React from "react";

import * as Entities from '../../entities';

const styles: any = require('./Comment.scss');

export class Comment extends React.Component<Entities.Comment, void> {
    public render() {
        const { createdBy, createdDate, content} = this.props;

        return (
            <div className={styles.comment}>
                <span>{content} - </span>
                <a href="#" className={styles.link}>{createdBy}</a>
                <span className={styles.helper}> {createdDate}</span>
            </div>
        );
    }
}

export default Comment;
