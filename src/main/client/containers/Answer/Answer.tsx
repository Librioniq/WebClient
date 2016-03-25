import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {assign} from 'lodash';
import {Actions} from  '../../redux/modules/Answer';
import * as Entities from '../../entities';
import * as Components from '../../components';
import * as Containers from '../../containers';


interface AnswerProps extends React.Props<Answer> {
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

@connect(
    ({answers}, {answer, params: {id} = { id: undefined }}) => ({ answer: assign({}, answer, answers.filter(it => it.id === Number(id))[0]) }),
    dispatch => bindActionCreators({ create: Actions.create, update: Actions.update, delete: Actions.remove }, dispatch)
)
export class Answer extends React.Component<AnswerProps, AnswerState> {
    public componentWillMount() {
        this.state = { edit: false, create: false, answer: this.props.answer };
    }

    public componentWillReceiveProps(props) {
        this.setState(assign({}, this.state, { answer: props.answer }) as AnswerState);
    }

    public render() {
        const {edit, create, answer} = this.state;
        const component = edit ? (<Components.Answer.Edit {...answer} onSave = { it => this.onSave(it) }/>) :
            create ? (<Components.Answer.Create {...answer}/>) :
                (<Components.Answer.Default {...answer} onEdit = { () => this.onEdit() } onDelete = { () => this.onDelete() }/>);

        return (
            <div>
                { component }
                <section>
                </section>
            </div>
        );
    }

    private renderComments() {
        const {answer: {id}} = this.props;

        return id !== undefined ? (<Containers.Comments parentId = {id}/>) : (<div>Loading...</div>);
    }

    private onEdit() {
        this.setState(assign({}, this.state, { edit: true }) as AnswerState);
    }

    private onSave(answer: Entities.Answer) {
        if (this.state.create) {
            this.props.create(0, answer);
        } else if (this.state.edit) {
            this.props.update(0, answer);
        }

        this.setState(assign({}, this.state, { edit: false, answer }) as AnswerState);
    }

    private onDelete() {
        this.props.delete(0, this.state.answer.id);
    }
}

export default Comment; 