import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {assign, isEmpty} from 'lodash';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */
import {Actions} from '../../redux/modules/Comment';

const css: any = require('./Comment.scss');

interface CommentProps extends React.Props<Comment> {
    parentId: number;
    comment?: Entities.Comment;
    edit?: boolean;
    handleCreate?: (parentId: number, comment: Entities.Comment) => void;
    handleUpdate?: (parentId: number, comment: Entities.Comment) => void;
    handleDelete?: (parentId: number, commentId: number) => void;
    onCancel?: Function;
}

interface CommentState {
    edit: boolean;
}

@(connect<CommentProps, CommentProps, CommentProps>(
    () => ({} as any),
    dispatch => bindActionCreators({ handleCreate: Actions.create, handleUpdate: Actions.update, handleDelete: Actions.remove }, dispatch) as any
) as ClassDecorator)
export class Comment extends React.Component<CommentProps, CommentState> {
    public componentWillMount() {
        const {comment, comment: {id}} = this.props;

        this.state = { edit: this.props.edit };
    }

    public componentWillReceiveProps(props) {
        const {comment, comment: {id}} = props;

        this.setState(assign({}, this.state, { edit: this.props.edit }) as CommentState);
    }

    public render() {
        const { edit } = this.state;
        const { comment } = this.props;

        let EditState = (
            <Components.Comment.Edit content={comment.content} onSave={(content) => this.onChange(content)} />
        )

        let ReadState = (
            <Components.Comment.Read comment={comment} />
        )

        let controls;

        if (edit) {
            controls = (
                <div>
                    <button onClick={() => this.setEdit(false)} className={css.link}>Cancel</button>
                </div>
            )
        } else {
            controls = (
                <div>
                    <button onClick={() => this.setEdit(true)} className={css.link}>Edit</button>
                    <button onClick={() => this.onDelete()} className={css.link}>Delete</button>
                </div>
            )
        }

        let controlBar = (
            <section className={css.controlBar}>
                {controls}
            </section>
        )

        const component = edit ? EditState : ReadState

        return (
            <section className={css.container}>
                {component}
                {controlBar}
            </section>
        );
    }

    private onChange(content) {
        this.props.comment.content = content;
    }

    private setEdit(edit: boolean) {
        this.setState({ edit: edit });
    }

    // private onCreate() {
    //     let comment: Entities.Comment = {
    //         content: this.props.comment.content
    //     }
    //     this.props.create(this.props.parentId, comment);
    //     this.setEdit(false);
    // }

    private onUpdate() {
        this.props.handleUpdate(this.props.parentId, this.props.comment);
        this.setEdit(false);
    }

    private onDelete() {
        // if (this.props.onCancel) {
        //     this.props.onCancel(event);
        // }
        this.props.handleDelete(this.props.parentId, this.props.comment.id);
    }
}

export default Comment;
