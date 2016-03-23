import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Comment';
import * as Entities from '../../entities';
import * as Containers from '../../containers';

interface CommentsProps extends React.Props<Comments> {
    comments?: Array<Entities.Comment>;
    list?: (id: number) => void;
}


@connect(
    () => ({}),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch)
)
export class Comments extends React.Component<CommentsProps, any> {
    public componentWillMount() {
        this.props.list(0);
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
