import * as React from "react";
import * as Entities from '../../entities';
import { Editor } from '../../components';

const css: any = require('./Comment.scss');

interface CommentProps extends Entities.Comment {
    onAddComment?: Function;
    onEdit?: Function;
}

export class Comment extends React.Component<CommentProps, any> {
    public render() {
        const { content, createdBy, createdDate } = this.props;

        let element;
            element = (
                <div className={css.comment}>
                    <span>{content} - </span>
                    <a href="#" className={css.link}>{createdBy}</a>
                    <span className={css.helper}> {createdDate}</span>
                    <span className={css.addButton}>ttt</span>
                    <button onClick={() => console.log('aaa')} className={css.addButton}>Add</button>
                </div>
            );

        return (
            <div className={css.comment}>
                <span>{content} - </span>
                <a href="#" className={css.link}>{createdBy}</a>
                <span className={css.helper}> {createdDate}</span>
                <button onClick={()=>this.edit()}>edit</button>
            </div>
        );
    }

    private edit() {
        this.props.onEdit();
    }
}

export default Comment;
