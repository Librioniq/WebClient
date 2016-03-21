import * as React from "react";
import * as Entities from '../../entities';
import { Comment, Editor } from '../../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions as CommentActions } from '../../redux/modules/Comment/index';



const css = require('./Question.scss');

interface QuestionProps extends React.Props<Question>, Entities.Question {
    comments?: Entities.Comment[];
}

@connect(
    state => ({
        comments: state.comments,
        text: state.editor.content
     }),
    dispatch => bindActionCreators({ CommentActions }, dispatch)
)

export class Question extends React.Component<QuestionProps, any> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            commentsID: 0
        }
    }

    addComment() {
        let comment: Entities.Comment = {
            content: this.state.text,
            id: 1
        }
        this.setState({'commentsID': ++this.state.commentsID})
        CommentActions.create(0, comment);
    }

    public render() {
        const { createdBy, title, content, createdDate, comments, tags } = this.props;

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>{title}</a>
                    <section>{tags && tags.map(tag => <a href="#" className={css.tag}>{tag}</a>) }</section>
                </header>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
                <section className={css.comments}>{comments && comments.map(comment => <Comment {...comment} />) }</section>

            </div>
        );
    }
}

export default Question;
