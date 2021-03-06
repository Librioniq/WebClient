import * as React from "react";
import { assign } from 'lodash';
import { Editor, MarkdownViewer } from '../../components';
import * as Entities from '../../entities';

const css: any = require('./Answer.scss');

interface AnswerProps {
    onCreate?: (answer: Entities.Answer) => void;
}

export class Answer extends React.Component<AnswerProps, Entities.Answer> {
    public componentWillMount() {
        this.state = { content: "" };
    }

    public render() {
        const {content} = this.state;

        return (
            <div>
                <Editor onChange = {it => this.onContentChange(it)} content = {content}/>
                <MarkdownViewer className = {"well"} content = {content}/>
                <button className = {css.actionButton} type = {"button"} onClick = {() => this.onCreate() }>Give your answer</button>
            </div>
        );
    }

    private onContentChange(content) {
        this.setState(assign({}, this.state, { content }) as Entities.Answer);
    }

    private onCreate() {
        this.props.onCreate(assign({}, this.state) as Entities.Answer);
    }
}

export default Answer;
