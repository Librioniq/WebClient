import * as React from "react";

const css = require("./Editor.scss");

interface EditorProps extends React.Props<Editor> {
    content?: string;
    onChange?: (content: string) => void;
}

interface EditorState {
    content?: string;
}

export class Editor extends React.Component<EditorProps, EditorState> {
    public componentWillMount() {
        const { content } = this.props;

        this.setState({ content });
    }

    public render() {
        const {content} = this.state;

        return (
            <section>
                <textarea
                    className={`form-control ${css.editor__textarea}`}
                    rows={3}
                    onChange={(e: Event) => this.onChangeContent(e) }
                    value={content}
                />
            </section>
        );
    }

    private onChangeContent(e: Event) {
        const content: string = (e.currentTarget as HTMLTextAreaElement).value;
        const {onChange} = this.props;

        this.setState({ content });
        if (onChange) {
            onChange(content);
        }
    };
}

export default Editor;
