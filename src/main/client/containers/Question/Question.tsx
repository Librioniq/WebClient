import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { assign } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from  '../../redux/modules/Question';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

interface QestionRoutingProps {
    id: number;
}

interface QuestionProps extends React.Props<Question>, RouteComponentProps<QestionRoutingProps, QestionRoutingProps> {
    children?: React.ReactElement<any>;
    get: (questionId) => void;
    create?: (question) => void;
    update?: (question: Entities.Question) => void;
    delete?: (questionId: number) => void;
    question?: Entities.Question;
}

interface QuestionState {
    edit: boolean;
    create: boolean;
    question: Entities.Question;
}

@connect(
    (s, {params: {id} = { id: undefined }}) => ({ question: s.questions.filter(it => it.id === Number(id))[0] || {} }),
    dispatch => bindActionCreators({ get: Actions.get }, dispatch)
)
export class Question extends React.Component<QuestionProps, QuestionState> {
    public componentWillMount() {
        const {get, params: {id}} = this.props;

        if (id === undefined) {
            return;
        }

        get(id);
    }

    public render() {
        const {edit, create, question} = this.state;
        const component = edit ? (<Components.Question.Edit {...question} onSave = { it => this.onSave(it) }/>) :
            create ? (<Components.Question.Create {...question}/>) :
                (<Components.Question.Default {...question} onEdit = { () => this.onEdit() } onDelete = { () => this.onDelete() }/>);
        return (
            <div>
                <div>
                    <Components.Question {...this.props.question}/>
                    {this.renderComments() }
                </div>
                <div>
                    {this.renderAnswers() }
                </div>
            </div>
        );
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
        }

        this.setState(assign({}, this.state, { edit: false, question }) as QuestionState);
    }

    private onDelete() {
        this.props.delete(this.state.question.id);
    }
}

export default Question;
