import * as React from "react";
import * as Entities from '../../entities';

const css: any = require('./Comment.scss');


export class Comment extends React.Component<Entities.Comment, any> {
    public render() {
        const { createdBy, createdDate, content} = this.props;

        return (
            <div className={css.comment}>
                <span>{content} - </span>
                <a href="#" className={css.link}>{createdBy}</a>
                <span className={css.helper}> {createdDate}</span>
            </div>
        );
    }
}

export default Comment;
