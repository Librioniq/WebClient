import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {assign} from 'lodash';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */
import {Actions} from '../../redux/modules/Comment';

interface CommentProps extends React.Props<Comment>, Entities.Comment {
    create?: (parentId: number, comment: Entities.Comment) => void;
    update?: (parentId: number, comment: Entities.Comment) => void;
    delete?: (parentId: number, commentId: number) => void;
    comment?: Entities.Comment;
}

interface CommentState {
    edit?: boolean;
    create?: boolean;
    comment?: Entities.Comment;
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

    public componentWillMount() {
        this.state = { edit: false, create: false, comment: this.props.comment };
    }

    public componentWillReceiveProps(props) {
        this.setState(assign({}, this.state, { comment: props.comment }) as CommentState);
    }

    private onEdit() {
        this.setState({ edit: true, create: false });
    }

    private onSave(content) {
        this.setState({ edit: false, create: false });
        this.props.content = content;
        if (this.state.create) {
            this.props.create(0, { content } as any);
        } else if (this.state.edit) {
            this.props.update(0, { content, id: 2 } as any);
        }
    }

    private onDelete() {
        this.props.delete(0, 2);
    }

    public render() {
        const { edit, create, comment } = this.state;
        const component = edit
            ? (<Components.Comment.Update content={'asd'}/>)
            : create
                ? (<section />)
                : (<Components.Comment.Read {...(this.props as any) } onEdit={() => this.onEdit() }/>);

        return (
            <div>
                {component}
                <button onClick={() => this.onDelete() }>delete </button>
            </div>
        );
    }
}

export default Comment;
