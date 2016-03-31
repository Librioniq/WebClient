import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { assign, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from  '../../redux/modules/Question';
import { Actions as CommentActions } from  '../../redux/modules/Comment';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

interface QestionRoutingProps {
    id: string;
}

interface QuestionProps extends React.Props<Question>, RouteComponentProps<QestionRoutingProps, QestionRoutingProps> {
    children?: React.ReactElement<any>;
    get: (questionId) => void;
    create?: (question) => void;
    update?: (question: Entities.Question) => void;
    delete?: (questionId: number) => void;
    question?: Entities.Question;
    createComment?: (elem: any) => void;
}

interface QuestionState {
    edit: boolean;
    create: boolean;
    question: Entities.Question;
    addComment?: boolean;
}

@connect(
    (s, {params: {id} = { id: undefined }}) => ({ question: s.questions.filter(it => it.id === Number(id))[0] || {} }),
    dispatch => bindActionCreators({ get: Actions.get, create: Actions.create, update: Actions.update, delete: Actions.remove, createComment: CommentActions.create }, dispatch)
)
export class Question extends React.Component<QuestionProps, QuestionState> {
    public componentWillMount() {
        const {get, params: {id}} = this.props;
        this.state = { edit: false, create: id === "ask", question: this.props.question, addComment: false };

        if (id === undefined || this.state.create) {
            return;
        }

        get(id);
    }

    public componentWillReceiveProps(props) {
        this.setState(assign({}, this.state, { question: props.question }) as QuestionState);
    }

    public render() {
        const {edit, create, question} = this.state;

        if (!create && isEmpty(question)) {
            return (<div>Loading...</div>);
        }

        const component = edit ? (<Components.Question.Edit {...question} onSave = { it => this.onSave(it) }/>) :
            create ? (<Components.Question.Create {...question} onCreate = { it => this.onSave(it) }/>) :
                (<Components.Question.Default {...question} onEdit = { () => this.onEdit() } onDelete = { () => this.onDelete() }/>);

        if (create) {
            return (<div>
                { component }
            </div>);
        }

        let addCom;

        if (this.state.addComment) {
            let com: Entities.Comment = {
                content: 'test'
            }
            addCom = (<Components.Comment.Create comment={com} onCreate={() => this.addComment()}/>)
        }

        return (
            <div>
                <div>
                    { component }
                    {this.renderComments() }
                    {addCom}
                </div>
                <div>
                    {this.renderAnswers() }
                </div>
            </div>
        );
    }

    private addComment() {
        this.setState({ edit: false, create: false, question: this.props.question, addComment: true })
    }

    private renderComments() {
        const {question: {id}} = this.props;

        return id !== undefined ? (<Containers.Comments parentId = { id }/>) : (<div>Loading...</div>);
    }

    private renderAnswers() {
        const {id} = this.props.question;

        return id !== undefined ? (<Containers.Answers parentId = { id }/>) : (<div>Loading...</div>);
    }

    private onEdit() {
        this.setState(assign({}, this.state, { edit: true }) as QuestionState);
    }

    private onSave(question: Entities.Question) {
        if (this.state.create) {
            this.props.create(question);
        } else if (this.state.edit) {
            this.props.update(question);
        this.setState(assign({}, this.state, { edit: false, create: false, question }) as QuestionState);
        }

    }

    private onDelete() {
        this.props.delete(this.state.question.id);
    }
}

export default Question;
