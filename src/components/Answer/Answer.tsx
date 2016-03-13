import * as React from "react";

import Comment from '../Comment/Comment.tsx';

const css: any = require('./answer.scss');
const color: any = require('../../theme/color.css');

interface CommentProps {
    author: string;
    content: string;
    date: string;
}

interface AnswerProps extends React.Props<Answer> {
    content?: string;
    author?: string;
    date?: string;
    comments?: CommentProps[];
    onAddComment?: (val: string) => any;
}

export class Answer extends React.Component<AnswerProps, void> {

    constructor(props) {
        super(props);
    }

    public render() {
        const author = this.props.author || 'Madara Uchiha',
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
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{author}</section>
                <section className={css.comments}>{comments}</section>
            </div>
        );
    }
}

export default Answer;
