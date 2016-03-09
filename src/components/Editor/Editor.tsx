import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onChangeContent} from  '../../redux/modules/editor';

const styles = require("Editor.scss");

interface EditorProps extends React.Props<Editor> {
    content?: string;
    onChangeContent?: (val: string) => any;
}

@connect(
    state => ({ content: state.editor.content }),
    dispatch => bindActionCreators({ onChangeContent }, dispatch))
export class Editor extends React.Component<EditorProps, void>{
    render() {
        const {content, onChangeContent} = this.props;
        return (
            <section>
                <div>
                    <textarea className="form-control" rows="3" onChange={onChangeContent} value={content}/>
                </div>
                <div class="well">{content}</div>
            </section>
        );
    }
}

export default Comment;
