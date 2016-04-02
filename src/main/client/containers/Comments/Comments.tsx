import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Comment';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
/* tslint:enable:no-unused-variable */

interface CommentsProps extends React.Props<Comments> {
    parentId: number;
    comments?: Array<Entities.Comment>;
    list?: (id: number) => void;
}

@(connect<CommentsProps, CommentsProps, CommentsProps>(
    (s, p) => ({ comments: s.comments.filter(it => it.parentId === p.parentId) } as any),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch) as any
) as ClassDecorator)
export class Comments extends React.Component<CommentsProps, any> {
    public componentWillMount() {
        const {parentId, list} = this.props;

        list(parentId);
    }

    public render() {
        const {comments, parentId} = this.props;

        let comment: Entities.Comment = {
            content: 'ttest'
        }

        let newComment = (
            <Containers.Comment edit={true} parentId = {parentId} comment={comment} />
        )

        return (
            <div className = { "container" }>
                { comments && comments.map(comment => <Containers.Comment comment={comment} parentId = { parentId }/>) }
                {newComment}
            </div>
        );
    }

}

export default Comments;
