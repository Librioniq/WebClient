import * as React from "react";

import { QuestionModel } from '../../models/question';

import Comment from '../Comment/Comment.tsx';
import Editor from '../Editor/Editor.tsx';

const css: any = require('./question.scss');
const color: any = require('../../theme/color.css');
// const commonCSS: any = require('../../theme/common.scss');

export class Question extends React.Component<QuestionModel, void> {

    constructor(props) {
        super(props);
    }

    public render() {
        const author = this.props.author || 'Madara Uchiha',
            title = this.props.title || 'Why shouldnt I use mysql_* functions in PHP?',
            content = this.props.content || 'Why should I use something else even if they work on my site?',
            date = this.props.date || 'Feb 5 12';
        const fakeComment1 = {
            author: 'Sergiy Kojedubov',
            content: 'Да, все так и есть.',
            date: 'Jan 13 16 at 13:14'
        };

        const fakeComment2 = {
            author: 'Андрей Поддубный',
            content: 'Nothing like that, I know better solutions',
            date: 'May 13 16 at 09:11'
        };

        const hasTags = false; // const hasTags = this.props.tags.length > 0;
        const tags = hasTags
                ? this.props.tags.map(function(tag) {
                    return <a href="#" className={css.tag}>tag</a>
                })
                : ['slq', 'php', 'databases'].map(function(tag) {
                    return <a href="#" className={css.tag}>{tag}</a>
                });

        const hasComments = false; // const hasComments = this.props.comments.length > 0;
        const comments = hasComments
                ? this.props.comments.map(function(comment) {
                    return <Comment
                                author={comment.author}
                                content={comment.content}
                                date={comment.date} />
                })
                : [fakeComment1, fakeComment2].map(function(comment) {
                    return <Comment
                                author={comment.author}
                                content={comment.content}
                                date={comment.date} />
                });

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>{title}</a>
                    <section>{tags}</section>
                </header>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{author}</section>
                <section className={css.comments}>{comments}</section>
                <Editor />
            </div>
        );
    }
}

export default Question;
