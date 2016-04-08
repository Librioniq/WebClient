import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Comment';
import {assign} from 'lodash';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
/* tslint:enable:no-unused-variable */

const css: any = require('./Comments.scss');

interface CommentsProps extends React.Props<Comments> {
    parentId: number;
    comments?: Array<Entities.Comment>;
    create?: (parentId: number, comment: Entities.Comment) => void;
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
        const {parentId, list} = this.props;

        this.state = { create: false, comments: [] };

        list(parentId);
    }

    public componentWillReceiveProps(props) {
        const { create, comments } = this.state;

        this.setState({ comments: create ? comments : props.comments, create: false });
    }

    public render() {
        const { parentId } = this.props;
        const { comments } = this.state;

        return (
            <section>
                { parentId !== undefined && comments && this.renderComments() }
            </section>
        );
    }

    private renderComments() {
        const { parentId } = this.props;
        const { create, comments } = this.state;

        return (
            <div className = {css.container}>
                { comments && comments.map(comment => <Containers.Comment comment = { comment } parentId = { parentId }/>) }
                { !create && this.renderAddCommentButton() }
            </div>
        );
    }

    private renderAddCommentButton() {
        return (
            <button type="button" className = { css.link } onClick = { () => this.onAddComment() }>Add Comment</button>
        );
    }

    private onCreate(answer: Entities.Answer) {
        const { create, parentId } = this.props;
        const { user: { firstName, lastName } } = this.context as { user: Entities.User };

        create(parentId, answer = assign({}, answer, { createdBy: `${firstName} ${lastName}` }) as Entities.Answer);

        this.setState(assign({}, this.state, { create: false }) as CommentsState);
    }

    private onAddComment(): void {
        this.setState(assign({}, this.state, { create: true }) as CommentsState);
    }
}

export default Comments;
