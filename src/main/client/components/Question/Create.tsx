import * as React from "react";
import { assign } from 'lodash';
import * as Entities from '../../entities';
import { Editor, MarkdownViewer } from '../../components';


interface QuestionProps {
    onCreate?: (question: Entities.Question) => void;
}

export class Question extends React.Component<QuestionProps, Entities.Question> {
    public componentWillMount() {
        this.state = { title: "", content: "", tags: [] };
    }

    public render() {
        const {content, title, tags} = this.state;

        return (
            <section>
                <div className = {"page-header"}>
                    <h1>Ask Question</h1>
                </div>
                <div>
                    <label htmlFor={"title"}>Title</label>
                    <input className = { "form-control" } name = { "title" } onChange = { it => this.onTitleChange((it.currentTarget as HTMLInputElement).value) } value = { title }/>
                    <br/>
                    <label>Content</label>
                    <Editor onChange = { it => this.onContentChange(it) } content = { content }/>
                    <MarkdownViewer className = { "well" } content = { content }/>
                    <br/>
                    <label htmlFor={ "tags" }>Tags</label>
                    <input className = { "form-control" } name = { "tags" } onChange = { it => this.onTagsChanged((it.currentTarget as HTMLInputElement).value) } value = { tags.join(" ") }/>
                    <br/>
                    <button className = { "btn btn-default" } type = { "button" } onClick = { () => this.onCreate() }>Create</button>
                </div>
            </section>
        );
    }

    private onTitleChange(title: string) {
        this.setState(assign({}, this.state, { title }) as Entities.Question);
    }

    private onTagsChanged(inlineTags: string) {
        this.setState(assign({}, this.state, { tags: inlineTags.split(/[,|\s]/ig).filter(it => !!it.trim().length) }) as Entities.Question);
    }

    private onContentChange(content: string) {
        this.setState(assign({}, this.state, { content }) as Entities.Question);
    }

    private onCreate() {
        this.props.onCreate(assign({}, this.state) as Entities.Question);
    }
}

export default Question;
