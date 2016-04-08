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
    update?: (parentId: number, answer: Entities.Answer) => void;
    delete?: (parentId: number, answerId: number) => void;
    answer?: Entities.Answer;
}

interface AnswerState {
    edit: boolean;
    answer: Entities.Answer;
}

@(connect<AnswerProps, AnswerProps, AnswerProps>(
    () => ({} as any),
    dispatch => bindActionCreators({ update: Actions.update, delete: Actions.remove }, dispatch) as any
) as ClassDecorator)
export class Answer extends React.Component<AnswerProps, AnswerState> {
    public static contextTypes: React.ValidationMap<any> = {
        auth: React.PropTypes.object,
        user: React.PropTypes.object
    };

    public componentWillMount() {
        const { answer } = this.props;

        this.state = { edit: false, answer };
    }

    public componentWillReceiveProps(props) {
        const {answer, answer: {id}} = props;

        this.setState(assign({}, this.state, { create: (!isEmpty(answer) && id === undefined), answer }) as AnswerState);
    }

    public render() {
        const {edit, answer, answer: { id }} = this.state;
        const component = edit ? (<Components.Answer.Edit {...answer} onSave = { it => this.onSave(it) }/>) :
            (<Components.Answer.Read {...answer} onEdit = { () => this.onEdit() } onDelete = { () => this.onDelete() }/>);

        return (
            <div>
                { component }
                <Containers.Comments parentId = {id}/>
            </div>
        );
    }

    private onEdit() {
        this.setState(assign({}, this.state, { edit: true }) as AnswerState);
    }

    private onSave(answer: Entities.Answer) {
        const { update, parentId } = this.props;
        const { user: { firstName, lastName } } = this.context as { user: Entities.User };

        update(parentId, answer = assign({}, answer, { lastModifiedBy: `${firstName} ${lastName}` }) as Entities.Answer);

        this.setState(assign({}, this.state, { edit: false, answer }) as AnswerState);
    }

    private onDelete() {
        const {parentId} = this.props;

        this.props.delete(parentId, this.state.answer.id);
    }
}

export default Answer;
