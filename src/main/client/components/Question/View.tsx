import * as React from "react";
import {Link} from 'react-router';
import * as Entities from '../../entities';
import {MarkdownViewer} from '../../components';

const css = require('./Question.scss');


export class Question extends React.Component<Entities.Question, any> {
    public render() {
        const {id, title, tags, content, createdBy } = this.props;

        return (
            <div className={css.root}>
                <header>
                    <Link to = { `/questions/${id}` } className = { css.title }>{ title }</Link>
                    <section className = { css.tags }>{tags && tags.map(tag => <a href="#" className={css.tag}>{tag}</a>) }</section>
                </header>
                <MarkdownViewer className = { css.content } content = { content.slice(0, 100).concat("...") }/>
                <section className={css.owner}>{createdBy}</section>
            </div>
        );
    }
}

export default Question;
