import * as React from "react";
import { assign } from 'lodash';
import * as Entities from '../../entities';
import { Editor, MarkdownViewer } from '../../components';

interface AnswerProps extends Entities.Answer {
    onSave?: (answer: Entities.Answer) => void;
}

export class Answer extends React.Component<AnswerProps, Entities.Answer> {
    public componentWillMount() {
        this.state = assign({}, this.props) as Entities.Answer;
    }

    public render() {
        const {content} = this.state;

        return (
            <div>
                <Editor onChange = {it => this.onChange(it) } content = {content}/>
                <MarkdownViewer className = {"well"} content = {content}/>
                <button className = {"btn btn-default"} type = {"button"} onClick = {() => this.onSave() }>Save</button>
            </div>
        );
    }

    private onChange(content) {
        this.setState(assign({}, this.state, { content }) as Entities.Answer);
    }

    private onSave() {
        this.props.onSave(assign({}, this.state) as Entities.Answer);
    }
}

export default Answer;
