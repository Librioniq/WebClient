import { Model } from './Model';
import { Editor } from '../editor/Editor';

import * as React from 'react';
import { assign } from 'lodash';

interface CommentProps {
    onSave?: (comment: Model) => void;
    comment?: Model;
}

export class Update extends React.Component<CommentProps, any> {
    public componentWillMount() {
        this.state = assign({}, this.props) as Model;
    }

    private componentWillReceiveProps(props) {
        this.state = assign({}, this.props) as Model;
    }

    public render() {
        const {content} = this.state.content;

        return (
            <div>
                <Editor onChange = {it => this.onChange(it) } content = {content}/>
                <button className = {"btn btn-default"} type = {"button"} onClick = {() => this.onSave()}>Save</button>
            </div>
        );
    }

    private onChange(content) {
    }

    private onSave() {
        this.props.onSave(assign({}, this.state) as Model);
    }
}

export default Update;
