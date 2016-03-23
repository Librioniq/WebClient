import * as React from "react";
import * as Entities from '../../entities';

const css = require('./Question.scss');


export class Question extends React.Component<Entities.Question, any> {
    public render() {
        const { title, tags, content, createdBy } = this.props;

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>{title}</a>
                    <section>{tags && tags.map(tag => <a href="#" className={css.tag}>{tag}</a>) }</section>
                </header>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
            </div>
        );
    }
}

export default Question;
