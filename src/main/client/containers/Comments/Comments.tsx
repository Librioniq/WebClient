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

@connect(
    (s, p) => ({ comments: s.comments.filter(it => it.parentId === p.parentId) }),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch)
)
export class Comments extends React.Component<CommentsProps, any> {
    public componentWillMount() {
        const {parentId, list} = this.props;

        list(parentId);
    }

    public render() {
        const {comments} = this.props;

        return (
            <div className="container">
                {comments && comments.map(comment => <Containers.Comment {...comment}/>) }
            </div>
        );
    }
}

export default Comments;
