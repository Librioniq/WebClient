import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onChangeContent} from  '../../redux/modules/editor';

const styles = require("./Editor.scss");

interface EditorProps extends React.Props<Editor> {
    content?: string;
    onChangeContent?: (val: string) => any;
}

@connect(
    state => ({ content: state.editor.content }),
    dispatch => bindActionCreators({ onChangeContent }, dispatch)
)
export class Editor extends React.Component<EditorProps, void> {
    public render() {
        const {content} = this.props;
        return (
            <section>
                <div>
                    <textarea className={`form-control ${styles.editor__textarea}`} rows={3} onChange={(e: Event) => this.onChangeContent(e) } value={content}/>
                </div>
                <div className="well">{content}</div>
            </section>
        );
    }

    private onChangeContent(e: Event) {
        const {onChangeContent} = this.props;
        onChangeContent((e.currentTarget as HTMLTextAreaElement).value);
    };
}

export default Comment;