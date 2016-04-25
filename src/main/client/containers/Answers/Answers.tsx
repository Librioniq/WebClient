import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Answer';
import {assign} from 'lodash';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Containers from '../../containers';
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

const css: any = require('./Answers.scss');


interface AnswersProps extends React.Props<Answers> {
    parentId: number;
    answers?: Array<Entities.Answer>;
    list?: (id: number) => any;
    create?: (parentId: number, answer: Entities.Answer) => void;
}

interface AnswersState {
    answers?: Array<Entities.Answer>;
    create: boolean;
}

@(connect<AnswersProps, AnswersProps, AnswersProps>(
    (s, p) => ({ answers: s.answers.filter(it => it.parentId === p.parentId) } as any),
    dispatch => bindActionCreators({ list: Actions.list, create: Actions.create }, dispatch) as any
) as ClassDecorator)
export class Answers extends React.Component<AnswersProps, AnswersState> {
    public static contextTypes: React.ValidationMap<any> = {
        auth: React.PropTypes.object,
        user: React.PropTypes.object
    };

    public componentWillMount() {
        this.state = { answers: [], create: false };
        const { parentId, list } = this.props;

        list(parentId);
    }

    public componentWillReceiveProps(props: AnswersProps) {
        this.setState(assign({}, this.state, { answers: props.answers }) as AnswersState);
    }

    public render() {
        const { parentId } = this.props;
        const { answers } = this.state;

        return (
            <div className = { css.answers }>
                { parentId !== undefined && answers && this.renderAnswers() }
            </div>
        );
    }

    private renderAnswers() {
        const { answers, create } = this.state;
        const { parentId } = this.props;

        return (
            <section>
                <header>{ answers.length } answers</header>
                <div>
                    { answers.map(answer => <Containers.Answer answer = { answer } parentId = { parentId }/>) }
                    { create ? this.renderNewAnswer() : this.renderAddAnswerButton() }
                </div>
            </section>
        );
    }

    private renderNewAnswer() {
        return (
            <Components.Answer.Create onCreate = { it => this.onCreate(it) }/>
        );
    }

    private renderAddAnswerButton() {
        return (
            <button type="button" className={css.actionButton} onClick = { () => this.onAddAnswer() }>Add Answer</button>
        );
    }

    private onCreate(answer: Entities.Answer) {
        const { create, parentId } = this.props;
        const { user: { firstName, lastName } } = this.context as { user: Entities.User };

        create(parentId, answer = assign({}, answer, { createdBy: `${firstName} ${lastName}` }) as Entities.Answer);

        this.setState(assign({}, this.state, { create: false }) as AnswersState);
    }

    private onAddAnswer(): void {
        this.setState(assign({}, this.state, { create: true }) as AnswersState);
    }
}

export default Answers;
