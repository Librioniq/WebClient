import Comment from '../../feature/Comment/Comment';
import * as Entities from '../../entities';
import { Actions } from  '../../redux/modules/Comment';

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assign } from 'lodash';

const css: any = require('./Comments.scss');

interface CommentsProps extends React.Props<Comments> {
    parentId: number;
    comments?: Array<Entities.Comment>;
    createNew?: boolean;

    list?: (id: number) => void;
    handleCreate?: Function;
}

interface CommentsState {
    comments: Array<Entities.Comment>;
    createNew: boolean;
}

@(connect<CommentsProps, CommentsProps, CommentsProps>(
    (s, p) => ({ comments: s.comments.filter(it => it.parentId === p.parentId) } as any),
    dispatch => bindActionCreators({ list: Actions.list, handleCreate: Actions.create }, dispatch) as any
) as ClassDecorator)
export class Comments extends React.Component<CommentsProps, CommentsState> {
    public static contextTypes: React.ValidationMap<any> = {
        auth: React.PropTypes.object,
        user: React.PropTypes.object
    }

    public componentWillMount() {
        const { parentId, list } = this.props;

        this.state = { createNew: false, comments: [] };

        list(parentId);
    }

    public componentWillReceiveProps(props) {

        this.setState({ comments: props.comments, createNew: props.createNew });
    }

    public render() {
        const { parentId } = this.props;
        const { comments, createNew } = this.state;

        const commentsToRender = this.renderComments(comments, parentId);
        const addButton = this.renderAddCommentButton(this.toggleNewComment.bind(this));
        // const newComment = this.renderNewComment(this.onCreate.bind(this))
        //{ createNew ? newComment : '' }

        return (
            <div className={css.comments}>
                { commentsToRender }

                { addButton }
            </div>
        );
    }

    private renderComments(comments, parentId) {
        return (
            parentId
                ? <div className = {css.container}>
                    { comments.map(comment => <Comment comment = { comment } parentId = { parentId } />) }
                </div>
                : <div>no id for parent</div>
        );
    }

    // private renderNewComment(onSave: Function) {
    //     return (
    //         <Comment.Edit content='' onSave={onSave} />
    //     )
    // }

    private renderAddCommentButton(action: Function) {
        return (
            <button type="button" className = { css.link } onClick = { () => action() }>Add Comment</button>
        );
    }

    private onCreate(comment: Entities.Comment) {
        const { handleCreate, parentId } = this.props;
        // const { user: { firstName, lastName } } = this.context as { user: Entities.User };

        handleCreate(parentId, comment);

        this.setState(assign({}, this.state, { createNew: false }) as CommentsState);
    }

    private toggleNewComment(): void {
        this.setState(assign({}, this.state, { createNew: !this.state.createNew }) as CommentsState);
    }
}

export default Comments;
