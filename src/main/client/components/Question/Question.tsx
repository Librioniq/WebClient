import * as React from "react";
import * as Entities from '../../entities';
import { Comment } from '../../components';

const css = require('./Question.scss');

interface QuestionProps extends React.Props<Question>, Entities.Question {
    comments?: Entities.Comment[];
}

export class Question extends React.Component<QuestionProps, void> {
    public test() {
        console.log('ttt');
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
                <button>Add</button>
            </div>
        );
    }
}

export default Question;
