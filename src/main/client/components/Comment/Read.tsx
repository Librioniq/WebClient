import * as React from "react";
import * as Entities from '../../entities';
import {  } from '../../components';

const css: any = require('./Comment.scss');

interface CommentProps extends Entities.Comment {
    onAddComment?: Function;
    onEdit?: Function;
    onDelete?: Function;
}

export class Comment extends React.Component<CommentProps, any> {

    private edit() {
        this.props.onEdit();
    }

    private delete() {
        this.props.onDelete();
    }

    public render() {
        const { content, createdBy, createdDate, onEdit, onDelete } = this.props;

        let element;
        element = (
            <div className={css.comment}>
                <span>{content} - </span>
                <a href="#" className={css.link}>{createdBy}</a>
                <span className={css.helper}>{createdDate}</span>
                <button onClick={onEdit}>edit</button>
                <button onClick={() => this.delete()}>delete</button>
            </div>
        );

        return (
            element
        );
    }

}

export default Comment;
