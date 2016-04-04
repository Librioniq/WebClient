import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Comment';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
/* tslint:enable:no-unused-variable */

const css: any = require('./css/Comments.scss');

interface CommentsProps extends React.Props<Comments> {
    parentId: number;
    comments?: Array<Entities.Comment>;
    list?: (id: number) => void;
}

interface CommentState {
    addComment: boolean;
}

@(connect<CommentsProps, CommentsProps, CommentsProps>(
    (s, p) => ({ comments: s.comments.filter(it => it.parentId === p.parentId) } as any),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch) as any
) as ClassDecorator)
export class Comments extends React.Component<CommentsProps, CommentState> {
    public componentWillMount() {
        const {parentId, list} = this.props;
        this.state = { addComment: false }

        list(parentId);
    }

    public componentWillReceiveProps(props) {
        // const {comment, comment: {id}} = props;

        // this.setState(assign({}, this.state, { edit: this.props.edit }) as CommentState);
    }

    public render() {
        const {comments, parentId} = this.props;

        let comment: Entities.Comment = {
            content: ''
        }

        let classes = comments;
        let newComment;

        if (this.state.addComment) {
            newComment = (
                <Containers.Comment edit={true} parentId={parentId} comment={comment} onCancel={this.hideComment}/>
            );
        } else {
            newComment = (<div></div>);
        }

        return (
            <div className = {css.container}>
                { comments && comments.map(comment => <Containers.Comment comment={comment} parentId = { parentId }/>) }
                <button className={css.link} onClick={() => this.showComment()}>add comment</button>
                {newComment}
            </div>
        );
    }

    private showComment() {
        this.setState({ addComment: true });
    }

    private hideComment(event) {
        this.setState({ addComment: false });
    }

}

export default Comments;
