import * as React from "react";
import * as Entities from '../../entities';
import {Comment} from '../../components';

const css: any = require('./Answer.scss');

interface AnswerProps extends React.Props<Answer>, Entities.Answer {
    comments?: Entities.Comment[];
}

export class Answer extends React.Component<AnswerProps, void> {
    public render() {
        const { createdBy, createdDate, content, comments } = this.props;

        return (
            <div className={css.root}>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
                <section className={css.comments}>{comments && comments.map(comment => <Comment {...comment}/>) }</section>
            </div>
        );
    }
}

export default Answer;
