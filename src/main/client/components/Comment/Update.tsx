import * as React from "react";
import { assign } from 'lodash';
import * as Entities from '../../entities';
import { Editor } from '../../components';

interface CommentProps extends Entities.Comment {
    onSave?: (comment: Entities.Comment) => void;
}

export class Comment extends React.Component<CommentProps, Entities.Comment> {
    public componentWillMount() {
        this.state = assign({}, this.props) as Entities.Comment;
    }

    public render() {
        const {content} = this.state;

        return (
            <div>
                <Editor onChange = {it => this.onChange(it) } content = {content}/>
                <button className = {"btn btn-default"} type = {"button"} onClick = {() => this.onSave() }>Save</button>
            </div>
        );
    }

    private onChange(content) {
        this.setState(assign({}, this.state, { content }) as Entities.Comment);
    }

    private onSave() {
        this.props.onSave(assign({}, this.state) as Entities.Comment);
    }
}

export default Comment;
