import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Answer';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
/* tslint:enable:no-unused-variable */

const css: any = require('./css/Answers.scss');


interface AnswersProps extends React.Props<Answers> {
    parentId: number;
    answers?: Array<Entities.Answer>;
    list?: (id: number) => any;
}

interface AnswersState {
    answers: Array<Entities.Answer>;
    create: boolean;
}

@(connect<AnswersProps, AnswersProps, AnswersProps>(
    (s, p) => ({ answers: s.answers.filter(it => it.parentId === p.parentId) } as any),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch) as any
) as ClassDecorator)
export class Answers extends React.Component<AnswersProps, AnswersState> {
    public componentWillMount() {
        this.state = { answers: [], create: false };
        const {parentId, list} = this.props;

        list(parentId);
    }

    public componentWillReceiveProps(props: AnswersProps) {
        const { answers } = props;
        const { create } = this.state;

        this.setState({ answers: create ? this.state.answers : answers, create: false });
    }

    public render() {
        const {parentId} = this.props;
        const {answers, create} = this.state;

        return (
            <div>
                { answers && answers.map(answer => <Containers.Answer answer = { answer } parentId = { parentId }/>) }
                { !create && this.renderAddAnswerButton() }
            </div>
        );
    }

    private renderAddAnswerButton() {
        return (
            <button type="button" className={css.actionButton} onClick = { () => this.onAddAnswer() }>Add Answer</button>
        );
    }

    private onAddAnswer(): void {
        this.setState({ answers: [...this.state.answers, { content: "" }], create: true });
    }
}

export default Answers;
