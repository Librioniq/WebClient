import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {assign, isEmpty} from 'lodash';
import {Actions} from  '../../redux/modules/Answer';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
import * as Containers from '../../containers';
/* tslint:enable:no-unused-variable */

interface AnswerProps extends React.Props<Answer> {
    parentId: number;
    create?: (parentId: number, answer: Entities.Answer) => void;
    update?: (parentId: number, answer: Entities.Answer) => void;
    delete?: (parentId: number, answerId: number) => void;
    answer?: Entities.Answer;
}

interface AnswerState {
    edit: boolean;
    create: boolean;
    answer: Entities.Answer;
}

@(connect<AnswerProps, AnswerProps, AnswerProps>(
    () => ({} as any),
    // ({answers}, {answer, params: {id} = { id: undefined }}) => ({ answer: assign({}, answer, answers.filter(it => it.id === Number(id))[0]) } as AnswerProps),
    dispatch => bindActionCreators({ create: Actions.create, update: Actions.update, delete: Actions.remove }, dispatch) as any
) as ClassDecorator)
export class Answer extends React.Component<AnswerProps, AnswerState> {
    public componentWillMount() {
        const {answer, answer: {id}} = this.props;

        this.state = { edit: false, create: (!isEmpty(answer) && id === undefined), answer };
    }

    public componentWillReceiveProps(props) {
        const {answer, answer: {id}} = props;

        this.setState(assign({}, this.state, { create: (!isEmpty(answer) && id === undefined), answer }) as AnswerState);
    }

    public render() {
        const {edit, create, answer} = this.state;
        const component = edit ? (<Components.Answer.Edit {...answer} onSave = { it => this.onSave(it) }/>) :
            create ? (<Components.Answer.Create onCreate = { it => this.onSave(it) }/>) :
                (<Components.Answer.Read {...answer} onEdit = { () => this.onEdit() } onDelete = { () => this.onDelete() }/>);

        if (create) {
            return (
                <div>
                    { component }
                </div>
            );
        }

        return (
            <div>
                { component }
                <section>
                    {this.renderComments() }
                </section>
            </div>
        );
    }

    private renderComments() {
        const {answer: {id}} = this.state;

        return id !== undefined ? (<Containers.Comments parentId = {id}/>) : (<div>Loading...</div>);
    }

    private onEdit() {
        this.setState(assign({}, this.state, { edit: true }) as AnswerState);
    }

    private onSave(answer: Entities.Answer) {
        const {create, update, parentId} = this.props;

        if (this.state.create) {
            create(parentId, answer);
        } else if (this.state.edit) {
            update(parentId, answer);
        }

        this.setState(assign({}, this.state, { edit: false, create: false, answer }) as AnswerState);
    }

    private onDelete() {
        const {parentId} = this.props;

        this.props.delete(parentId, this.state.answer.id);
    }
}

export default Answer; 