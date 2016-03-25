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
    questions: Array<Entities.Question>;
    list: () => any;
}


@connect(
    state => ({ questions: state.questions }),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch)
)
export class Questions extends React.Component<QuestionsProps, void> {
    public componentWillMount() {
        this.props.list();
    }

    public render() {
        const {questions} = this.props;

        return (
            <div className={css.container}>
                <header>
                    <span className={css.title}>All questions</span>
                </header>
                <div>
                    {questions && questions.map(question => <Components.Question {...question}/>) }
                </div>
            </div>
        );
    }
}

export default Questions;
