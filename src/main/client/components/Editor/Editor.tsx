import * as React from "react";

const styles = require("./Editor.scss");

interface EditorProps extends React.Props<Editor> {
    content?: string;
    onChangeContent?: (val: string) => any;
}

interface EditorState {
    text?: string;
}

export class Editor extends React.Component<EditorProps, EditorState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.content || ''
        };
    }
    public render() {
        const {content} = this.props;
        return (
            <section>
                <div>
                    <textarea className={`form-control ${styles.editor__textarea}`} rows={3} onChange={(e: Event) => this.onChangeContent(e) } value={this.state.text}/>
                </div>
                <div className="well">{this.state.text}</div>
            </section>
        );
    }

    private onChangeContent(e: Event) {
        const {onChangeContent} = this.props;
        onChangeContent((e.currentTarget as HTMLTextAreaElement).value);
    };
}

export default Editor;
