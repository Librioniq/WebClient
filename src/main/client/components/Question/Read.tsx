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
        const { title, tags, content, createdBy } = this.props;

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>{title}</a>
                    <section>{tags && tags.map(tag => <a href="#" className={css.tag}>{tag}</a>) }</section>
                </header>
                <MarkdownViewer className={css.content} content = {content}/>
                <section className={css.owner}>{createdBy}</section>
                <div className = {"btn-group btn-group-xs"} role = {"group"}>
                    <button className = {"btn btn-link"} type = {"button"} onClick = {() => this.onEdit() }>Edit</button>
                    <button className = {"btn btn-link"} type = {"button"} onClick = {() => this.onDelete() }>Delete</button>
                </div>
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
