import * as React from "react";
import * as Entities from '../../entities';
import {MarkdownViewer} from '../../components';

const css = require('./Question.scss');

interface QuestionProps extends Entities.Question {
    onEdit?: () => void;
    onDelete?: () => void;
}

export class Question extends React.Component<QuestionProps, any> {
    public render() {
        let { title, tags, content, createdBy } = this.props;
        createdBy = createdBy || 'Vladimir Puchkov';

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>{title}</a>
                    <section className = { css.tags }>{tags && tags.map(tag => <a href="#" className={css.tag}>{tag}</a>)}</section>
                </header>
                <MarkdownViewer className={css.content} content = {content}/>
                <div className = {css.controls} role = {"group"}>
                    <button className = {css.link} type = {"button"} onClick = {() => this.onEdit() }>Edit</button>
                    <button className = {css.link} type = {"button"} onClick = {() => this.onDelete() }>Delete</button>
                </div>
                <section className={css.owner}>
                    <a href="#">{createdBy}</a>
                </section>
            </div>
        );
    }

    private onEdit() {
        this.props.onEdit();
    }

    private onDelete() {
        this.props.onDelete();
    }
}

export default Question;
