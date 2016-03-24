import * as React from "react";

const styles = require("./Editor.scss");

interface EditorProps extends React.Props<Editor> {
    content?: string;
    onSave?: Function;
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
                <button onClick={() => this.save()}>save</button>
            </section>
        );
    }

    private save() {
        this.props.onSave(this.state.text);
    }

    private onChangeContent(e: Event) {
        this.setState({text: (e.currentTarget as HTMLTextAreaElement).value})
    };
}

export default Editor;
