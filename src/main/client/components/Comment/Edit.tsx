import * as React from 'react';
import Editor from '../Editor/Editor'

const css: any = require('./css/Comment.scss');

interface Props {
    content: string;
    onSave: Function;
}

function EditComment(props: Props) {
    return (
        <div>
            <Editor content={props.content} />
            <button onClick={props.onSave}>save</button>
        </div>
    )
}

export default EditComment;
