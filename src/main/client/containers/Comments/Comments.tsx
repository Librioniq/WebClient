import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Comment';
import {assign} from 'lodash';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
import * as Comment from '../../components/Comment';
/* tslint:enable:no-unused-variable */

const css: any = require('./Comments.scss');

interface CommentsProps extends React.Props<Comments> {
    parentId: number;
    comments?: Array<Entities.Comment>;
    handleCreate?: (parentId: number, comment: Entities.Comment) => void;
    list?: (id: number) => void;
}

interface CommentsState {
    comments: Array<Entities.Comment>;
    create: boolean;
}

@(connect<CommentsProps, CommentsProps, CommentsProps>(
    (s, p) => ({ comments: s.comments.filter(it => it.parentId === p.parentId) } as any),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch) as any
) as ClassDecorator)
export class Comments extends React.Component<CommentsProps, CommentsState> {
    public componentWillMount() {
        const { parentId, list } = this.props;

        this.state = { create: true, comments: [] };

        list(parentId);
    }

    public componentWillReceiveProps(props) {
        const { create, comments } = this.state;

        this.setState({ comments: create ? comments : props.comments, create: true });
    }

    public render() {
        const { parentId } = this.props;
        const { comments, create } = this.state;

        const commentsToRender = this.renderComments(comments, parentId);
        const addButton = this.renderAddCommentButton(this.toggleNewComment.bind(this));
        const newComment = create
                            ? this.renderNewComment(this.onCreate.bind(this))
                            : '';

        return (
            <div className={css.comments}>
                {commentsToRender}
                {newComment}
                {addButton}
            </div>

        );
    }

    private renderComments(comments, parentId) {
        return (
            !parentId
                ? <div>no id for parent</div>
                : <div className = {css.container}>
                    { comments.map(comment => <Containers.Comment comment = { comment } parentId = { parentId }/>) }
                </div>
        );
    }

    private renderNewComment(onSave: Function) {
        return (
            <Comment.Edit content='' onSave={onSave}/>
        )
    }

    private renderAddCommentButton(action: Function) {
        return (
            <button type="button" className = { css.link } onClick = { () => action() }>Add Comment</button>
        );
    }

    private onCreate(comment: Entities.Comment) {
        const { handleCreate, parentId } = this.props;
        // const { user: { firstName, lastName } } = this.context as { user: Entities.User };

        handleCreate(parentId, comment = assign({}, comment) as Entities.Comment);

        this.setState(assign({}, this.state, { create: false }) as CommentsState);
    }

    private onAddComment(): void {

    }

    private toggleNewComment(): void {
        this.setState(assign({}, this.state, { create: !this.state.create }) as CommentsState);
    }
}

export default Comments;
