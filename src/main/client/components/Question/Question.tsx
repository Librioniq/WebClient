import * as React from "react";
import {assign} from 'lodash';

import * as Entities from '../../entities';

import Comment from '../Comment/Comment.tsx';
import Editor from '../Editor/Editor.tsx';

const css: any = require('./question.scss');
const color: any = require('../../theme/color.css');

export class Question extends React.Component<Entities.Question, void> {

    constructor(props) {
        super(props);
    }

    public render() {
        const { createdBy, title, content, createdDate } = this.props;

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
                    return <Comment {...comment} />
                })
                : [fakeComment1, fakeComment2].map(function(comment) {
                    return <Comment {...comment}/>
                });

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>{title}</a>
                    <section>{tags}</section>
                </header>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
                <section className={css.comments}>{comments}</section>
                <Editor />
            </div>
        );
    }
}

export default Question;
