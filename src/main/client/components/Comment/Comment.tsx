import * as React from "react";
import * as Entities from '../../entities';
import { Editor } from '../../components';

const css: any = require('./Comment.scss');

interface CommentProps {
    comment?: Entities.Comment;
    onAddComment?: Function;
    onEditComment?: Function;
    editing?: boolean;
}

interface CommentState {
    content?: string;
    editing?: boolean;
}

export class Comment extends React.Component<CommentProps, CommentState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            content: this.props.comment.content || '',
            editing: this.props.editing || false
        };
    }
    public render() {
        const { content, createdBy, createdDate } = this.props.comment;

        let element;
        if (!this.state.editing) {
            element = (<Editor content={this.state.content} />);
        } else {
            element = (
                <div className={css.comment}>
                    <span>{content} - </span>
                    <a href="#" className={css.link}>{createdBy}</a>
                    <span className={css.helper}> {createdDate}</span>
                    <span className={css.addButton}>ttt</span>
                    <button onClick={() => console.log('aaa')} className={css.addButton}>Add</button>
                </div>
            );
        }


        return (
            element
        );
    }
}

export default Comment;
