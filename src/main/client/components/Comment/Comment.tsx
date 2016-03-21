import * as React from "react";

import * as Entities from '../../entities';
import Editor from '../Editor/Editor';

const styles: any = require('./Comment.scss');

interface CommentProps extends React.Props<Comment>, Entities.Comment {
    comment?: Entities.Comment;
    deleteComment?: Function;
    editComment?: Function;
    key?: any;
}

interface CommentState {
    editing: boolean;
};

export class Comment extends React.Component<CommentProps, CommentState> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            editing: false
        }
        props.deleteComment = () => {
            console.log('delete');
        }
    }

    handleEdit() {
        this.setState({ editing: true })
    }

    handleSave(id, text) {
        if (text.length === 0) {
            this.props.deleteComment(id)
        } else {
            this.props.editComment(id, text)
        }
        this.setState({ editing: false })
    }

    public render() {
        const { comment, deleteComment, editComment } = this.props;

        let element;
        if (this.state.editing) {
            element = (
                <div>
                    <Editor content={comment.content} />
                    <button onClick={() => this.handleSave(3, 'asd')}>Save</button>
                </div>
            )
        } else {
          element = (
              <div className={styles.comment}>
                  <span>{comment.content} - </span>
                  <a href="#" className={styles.link}>{comment.createdBy}</a>
                  <span className={styles.helper}> {comment.createdDate}</span>
                  <button onClick={() => deleteComment(comment)}>Delete</button>
                  <button onClick={() => this.handleEdit()}>Edit</button>
              </div>
          )
        }

        return (
            // <div className={styles.comment}>
            //     <span>{content} - </span>
            //     <a href="#" className={styles.link}>{createdBy}</a>
            //     <span className={styles.helper}> {createdDate}</span>
            // </div>
            element
        );
    }
}

export default Comment;
