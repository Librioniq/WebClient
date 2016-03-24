import * as React from "react";
import * as Entities from '../../entities';

const css: any = require('./Answer.scss');

export class Answer extends React.Component<Entities.Answer, any> {
    public render() {
        const { createdBy, createdDate, content} = this.props;

        return (
            <div className={css.root}>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
            </div>
        );
    }
}

export default Answer;
