import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */
import {Actions} from '../../redux/modules/Comment';

const css: any = require('./css/Comment.scss');
import {assign, isEmpty} from 'lodash';

interface CommentProps extends React.Props<Comment> {
    parentId: number;
    comment?: Entities.Comment;
    edit?: boolean;
    create?: (parentId: number, comment: Entities.Comment) => void;
    update?: (parentId: number, comment: Entities.Comment) => void;
    delete?: (parentId: number, commentId: number) => void;
}

interface CommentState {
    edit: boolean;
}

@(connect<CommentProps, CommentProps, CommentProps>(
    () => ({} as any),
    dispatch => bindActionCreators({ create: Actions.create, update: Actions.update, delete: Actions.remove }, dispatch) as any
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
        const { parentId, comment } = this.props;

        let EditState = (
            <Components.Editor content={comment.content} />
        )

        let ReadState = (
            <div className={css.comment}>
                <span>{comment.content} - </span>
                <a href="#" className={css.link}>{comment.createdBy}</a>
                <span className={css.helper}>{comment.createdDate}</span>
            </div>
        )

        let controlBar = (
            <section className="controls">
                <button onClick={this.onCreate.bind(this)}>Save</button>
                <button onClick={this.read.bind(this)}>Cancel</button>
                <button onClick={this.edit.bind(this)}>Edit</button>
                <button onClick={this.onDelete.bind(this)}>Delete</button>
            </section>
        )

        const component = edit ? EditState : ReadState

        return (
            <div>
                {component}
                {controlBar}
            </div>
        );
    }

    private read() {
        this.setState({ edit: false });
    }

    private edit() {
        this.setState({ edit: true });
    }

    private onCreate() {
        let comment: Entities.Comment = {
            content: ''
        }
        this.props.create(this.props.parentId, comment);
    }

    private update() {
        let comment: Entities.Comment = {
            content: 'bad save'
        }
        this.props.update(this.props.parentId, this.props.comment);
    }

    private onDelete() {
        this.props.delete(this.props.parentId, this.props.comment.id);
    }
}

export default Comment;
