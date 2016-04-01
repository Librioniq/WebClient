import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Question';
import * as Entities from '../../entities';
/* tslint:disable:no-unused-variable */
import * as Components from '../../components';
/* tslint:enable:no-unused-variable */

const css = require('./Questions.scss');

interface QuestionsProps extends React.Props<Questions> {
    questions?: Array<Entities.Question>;
    list?: () => void;
}

@(connect<QuestionsProps, QuestionsProps, QuestionsProps>(
    state => ({ questions: state.questions } as any),
    dispatch => (bindActionCreators({ list: Actions.list }, dispatch) as any)
) as ClassDecorator)
export class Questions extends React.Component<QuestionsProps, any> {
    public componentWillMount() {
        this.props.list();
    }

    public render() {
        const {questions} = this.props;

        return (
            <div className={css.container}>
                <header>
                    <span className = { css.title }>All questions</span>
                </header>
                <div>
                    {questions && questions.map(question => <Components.Question.View {...question}/>) }
                </div>
            </div>
        );
    }
}

export default Questions;
