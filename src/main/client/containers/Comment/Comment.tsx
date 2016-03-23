import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Entities from '../../entities';
import * as Components from '../../components';
import {Actions} from '../../redux/modules/Comment';

interface CommentProps extends React.Props<Comment>, Entities.Comment {
    create?: (parentId: number, comment: Entities.Comment) => void;
    update?: (parentId: number, comment: Entities.Comment) => void;
    delete?: (parentId: number, commentId: number) => void;
}

interface CommentState {
    edit: boolean;
    create: boolean;
}

@connect(
    () => ({}),
    dispatch => bindActionCreators({ create: Actions.create, update: Actions.update, delete: Actions.remove }, dispatch)
)
export class Comment extends React.Component<CommentProps, CommentState> {
    constructor(props: CommentProps, context) {
        super(props, context);

        this.state = { edit: false, create: false };
    }

    public render() {
        const {edit, create} = this.state;
        const component = edit ? (<div/>) : create ? (<section/>) : (<Components.Comment {...this.props}/>);

        return (component);
    }

    private onEdit() {
        this.setState({ edit: true, create: false });
    }

    private onSave() {
        if (this.state.create) {
            this.props.create(0, {} as any);
        } else if (this.state.edit) {
            this.props.update(0, {} as any);
        }
    }

    private onDelete() {
        this.props.delete(0, 0);
    }
}

export default Comment; 