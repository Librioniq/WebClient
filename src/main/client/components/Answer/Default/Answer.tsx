import * as React from "react";
import * as Entities from '../../../entities';

const css: any = require('./Answer.scss');

interface AnswerProps extends Entities.Answer {
    onEdit?: () => void;
    onDelete?: () => void;
}

export class Answer extends React.Component<AnswerProps, any> {
    public render() {
        const { createdBy, createdDate, content} = this.props;

        return (
            <div className={css.root}>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
                <div className = {"btn-group btn-group-xs"} role = {"group"}>
                    <button className = {"btn btn-link"} type = {"button"} onClick = {() => this.onEdit() }>Edit</button>
                    <button className = {"btn btn-link"} type = {"button"} onClick = {() => this.onDelete() }>Delete</button>
                </div>
            </div >
        );
    }

    private onEdit() {
        this.props.onEdit();
    }

    private onDelete() {
        this.props.onDelete();
    }
}

export default Answer;
