import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Answer';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
/* tslint:enable:no-unused-variable */

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
            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default" onClick = { () => this.onAddAnswer() }>Add Answer</button>
                </div>
            </div>
        );
    }

    private onAddAnswer(): void {
        this.setState({ answers: [...this.state.answers, { content: "" }], create: true });
    }
}

export default Answers;
