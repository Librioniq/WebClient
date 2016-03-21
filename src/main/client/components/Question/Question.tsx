import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Entities from '../../entities';
import { Comment, Editor } from '../../components';
import { createComment } from '../../redux/modules/comment';

const css = require('./Question.scss');

interface QuestionProps extends React.Props<Question>, Entities.Question {
    comments?: Entities.Comment[];
    createComment?: Function;
    text?: string;
    actions?: any;
}

interface QuestionState {
    commentsID: number;
}

@connect(
    state => ({
        comments: state.comments,
        text: state.editor.content
     }),
    dispatch => bindActionCreators({ createComment }, dispatch)
)

export class Question extends React.Component<QuestionProps, QuestionState> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            commentsID: 0
        }
    }

    addComment() {
        let comment: Entities.Comment = {
            content: this.props.text,
            id: this.state.commentsID
        }
        this.setState({'commentsID': ++this.state.commentsID})
        this.props.createComment(comment);
    }

    public render() {
        const { createdBy, title, content, createdDate, comments, tags, actions } = this.props;

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>"test"</a>
                    <section>{tags && tags.map(tag => <a href="#" className={css.tag}>{tag}</a>) }</section>
                </header>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
                <section className={css.comments}>
                    {comments && comments.map(comment => <Comment key={comment.id} comment={comment} {...actions}/>) }
                    <Editor />
                    <button onClick={this.addComment.bind(this)}>Add comment</button>
                </section>
            </div>
        );
    }
}

export default Question;
