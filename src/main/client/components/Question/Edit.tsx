import * as React from "react";
import { assign } from 'lodash';
import * as Entities from '../../entities';
import { Editor, MarkdownViewer, TagsInput } from '../../components';

const css: any = require('./Question.scss');


interface QuestionProps extends Entities.Question {
    onSave?: (answer: Entities.Question) => void;
}

export class Question extends React.Component<QuestionProps, Entities.Question> {
    public componentWillMount() {
        this.state = assign({}, this.props) as Entities.Question;
    }

    public render() {
        const {content, title, tags } = this.state;

        return (
            <div>
                <label htmlFor={"title"} className={css.title}>Title</label>
                <input className = {css.input} name = { "title" } onChange = { it => this.onTitleChange((it.currentTarget as HTMLInputElement).value) } value = { title }/>
                <label className = {css.title}>Question</label>
                <Editor onChange = { it => this.onContentChange(it) } content = { content } />
                <MarkdownViewer className = { "well" } content = { content }/>
                <label htmlFor = { "tags" } className = {css.title}>Tags</label>
                <TagsInput onTagsChange = { it => this.onTagsChange(it) } tags = { tags } />
                <button className = { css.actionButton } type = { "button" } onClick = { () => this.onSave() }>Update Question</button>
            </div>
        );
    }

    private onTitleChange(title: string) {
        this.setState(assign({}, this.state, { title }) as Entities.Question);
    }

    private onTagsChange(tags: string[]) {
        this.setState(assign({}, this.state, { tags }) as Entities.Question);
    }

    private onContentChange(content: string) {
        this.setState(assign({}, this.state, { content }) as Entities.Question);
    }

    private onSave() {
        this.props.onSave(assign({}, this.state) as Entities.Question);
    }
}

export default Question;
