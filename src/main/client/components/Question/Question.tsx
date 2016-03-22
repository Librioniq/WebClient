import * as React from "react";
import * as Entities from '../../entities';
import { Comment, Editor } from '../../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions as CommentActions } from '../../redux/modules/Comment';

const css = require('./Question.scss');

interface QuestionProps extends React.Props<Question>, Entities.Question {
    comments?: Entities.Comment[];
    create?: (id, comment) => void;
}

@connect(
    state => ({
        comments: state.question.comments,
        text: 'state.editor.content'
     }),
    dispatch => bindActionCreators({ create: CommentActions.create }, dispatch)
)
export class Question extends React.Component<QuestionProps, any> {
    public render() {
        const { title, tags, content, createdBy, comments } = this.props;

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>{title}</a>
                    <section>{tags && tags.map(tag => <a href="#" className={css.tag}>{tag}</a>) }</section>
                </header>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
                <section className={css.comments}>{comments && comments.map(comment => <Comment comment={comment} />) }</section>
                <button onClick={() => this.onAddComment()}>Add</button>
            </div>
        );
    }

    public onAddComment() {
        this.props.create(0, {content: "asdasda"});
    }
}

export default Question;
