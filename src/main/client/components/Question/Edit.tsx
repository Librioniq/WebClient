import * as React from "react";
import { assign } from 'lodash';
import * as Entities from '../../entities';
import { Editor, MarkdownViewer } from '../../components';


interface QuestionProps extends Entities.Question {
    onSave?: (answer: Entities.Question) => void;
}

export class Question extends React.Component<QuestionProps, Entities.Question> {
    public componentWillMount() {
        this.state = assign({}, this.props) as Entities.Question;
    }

    public render() {
        const {content, title} = this.state;

        return (
            <div>
                <input onChange = { it => this.onTitleChange((it.currentTarget as HTMLInputElement).value) } value = { title }/>
                <Editor onChange = { it => this.onContentChange(it) } content = { content }/>
                <MarkdownViewer className = {"well"} content = { content }/>
                <button className = {"btn btn-default"} type = {"button"} onClick = { () => this.onSave() }>Save</button>
            </div>
        );
    }

    private onTitleChange(title: string) {
        this.setState(assign({}, this.state, { title }) as Entities.Question);
    }

    private onContentChange(content: string) {
        this.setState(assign({}, this.state, { content }) as Entities.Question);
    }

    private onSave() {
        this.props.onSave(assign({}, this.state) as Entities.Question);
    }
}

export default Question;
