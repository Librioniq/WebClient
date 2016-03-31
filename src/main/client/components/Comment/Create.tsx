import * as React from "react";
import * as Entities from '../../entities';
import { assign } from 'lodash';

interface CommentProps {
    comment?: Entities.Comment;
    onCreate?: Function;
}

export class Comment extends React.Component<CommentProps, any> {
    private onCreate() {
        this.props.onCreate({
            content: ''
        } as Entities.Comment);
    }

    public render() {
        const { comment } = this.props;

        return (
            <div>
                <button onClick={() => this.onCreate()}>add</button>
            </div>
        );
    }
}

export default Comment;
