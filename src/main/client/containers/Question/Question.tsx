import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { assign, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from  '../../redux/modules/Question';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

const css: any = require('./Question.scss');
const emptyQuestion: Entities.Question = { content: "" };

interface QestionRoutingProps {
    id: string;
}

interface QuestionProps extends React.Props<Question>, RouteComponentProps<QestionRoutingProps, QestionRoutingProps> {
    children?: React.ReactElement<any>;
    get: (questionId) => void;
    create?: (question: Entities.Question) => void;
    update?: (question: Entities.Question) => void;
    delete?: (questionId: number) => void;
    question?: Entities.Question;
}

interface QuestionState {
    edit: boolean;
    create: boolean;
    question: Entities.Question;
}

@(connect<QuestionProps, QuestionProps, QuestionProps>(
    (s, {params: {id} = { id: undefined }}) => ({ question: s.questions.filter(it => it.id === Number(id))[0] || emptyQuestion } as any),
    dispatch => (bindActionCreators({ get: Actions.get, create: Actions.create, update: Actions.update, delete: Actions.remove }, dispatch) as QuestionProps)
) as ClassDecorator)
export class Question extends React.Component<QuestionProps, QuestionState> {
    public static contextTypes: React.ValidationMap<any> = {
        auth: React.PropTypes.object,
        user: React.PropTypes.object
    };

    public componentWillMount() {
        const {get, route: { path }, params: { id }} = this.props;

        this.state = { edit: false, create: path === "ask", question: this.props.question };

        if (id === undefined || this.state.create) {
            return;
        }

        get(id);
    }

    public componentWillReceiveProps(props) {
        const { params: {id}, question } = props;

        this.setState(assign({}, this.state, { question, create: id === "ask" }) as QuestionState);
    }

    public render() {
        const { edit, create, question, question: { id } } = this.state;

        const component = edit ? (<Components.Question.Edit {...question} onSave = { it => this.onSave(it) }/>) :
            create ? (<Components.Question.Create {...question} onCreate = { it => this.onSave(it) }/>) :
                (<Components.Question.Read {...question} onEdit = { () => this.onEdit() } onDelete = { () => this.onDelete() }/>);

        return (
            <div className = { css.container }>
                <div className = { css.main }>
                    { component }
                    <Containers.Comments parentId = { id }/>
                </div>
                <Containers.Answers parentId = { id }/>
            </div>
        );
    }

    private onEdit() {
        this.setState(assign({}, this.state, { edit: true }) as QuestionState);
    }

    private onSave(question: Entities.Question) {
        const { user: {firstName, lastName} } = this.context as { user: Entities.User };

        if (this.state.create) {
            this.props.create(question = assign({}, question, { createdBy: `${firstName} ${lastName}` }) as Entities.Question);
        } else if (this.state.edit) {
            this.props.update(question = assign({}, question, { lastModifiedBy: `${firstName} ${lastName}` }) as Entities.Question);
        }

        this.setState(assign({}, this.state, { edit: false, create: false, question }) as QuestionState);
    }

    private onDelete() {
        this.props.delete(this.state.question.id);
    }
}

export default Question;
