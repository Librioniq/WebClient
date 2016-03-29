import * as React from "react";
import * as Entities from '../../entities';
import {  } from '../../components';

const css: any = require('./Comment.scss');

interface CommentProps extends Entities.Comment {
    onAddComment?: Function;
    onEdit?: Function;
}

export class Comment extends React.Component<CommentProps, any> {
    private test() {
        console.log('aaa');
    }

    public render() {
        const { content, createdBy, createdDate } = this.props;

        let element;
        element = (
            <div className={css.comment}>
                <span>{content} - </span>
                <a href="#" className={css.link}>{createdBy}</a>
                <span className={css.helper}> {createdDate}</span>
                <button onClick={this.test}>edit</button>
            </div>
        );

        return (
            element
        );
    }

    private edit() {
        this.props.onEdit();
    }
}

export default Comment;
