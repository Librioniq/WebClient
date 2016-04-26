import * as React from 'react';
import Editor from '../Editor/Editor'
import * as Entities from '../../Entities';

import {assign} from 'lodash';

const css: any = require('./css/Comment.scss');

interface Props {
    content: string;
    onSave: Function;
    handleChangeContent?: Function;
}

interface State {
    content: string;
}

export class EditComment extends React.Component<Props, State> {
    public componentWillMount() {
        this.state = { content: '' };
    }

    public componentWillReceiveProps(props: Props) {
        this.setState({ content: props.content });
    }

    public render() {
        return (
            <div>
                <Editor content={this.props.content} onChange={this.handleChange.bind(this)}/>
                <button onClick={this.save.bind(this)}>save</button>
            </div>
        )
    }

    private save() {
        if (this.state.content.length > 0) {
            let comment = {
                content: this.state.content
            } as Entities.Comment;

            this.props.onSave(comment);
        }
    }

    private handleChange(content) {
        this.setState({content: content});
    }
}

export default EditComment;
