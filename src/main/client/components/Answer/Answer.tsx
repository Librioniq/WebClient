import * as React from "react";

import * as Entities from '../../entities';
import Comment from '../comment/Comment';

const css: any = require('./answer.scss');
const color: any = require('../../theme/color.css');

interface AnswerProps extends Entities.Answer {
    comments?: Entities.Comment[];
}

export class Answer extends React.Component<AnswerProps, void> {

    constructor(props) {
        super(props);
    }

    public render() {
        const { createdBy, createdDate, content } = this.props;

        const hasComments = false; // const hasComments = this.props.comments.length > 0;
        const comments = hasComments
                ? this.props.comments.map(function(comment) {
                    return <Comment {...comment}/>
                })
                : null;

        return (
            <div className={css.root}>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
                <section className={css.comments}>{comments}</section>
            </div>
        );
    }
}

export default Answer;
