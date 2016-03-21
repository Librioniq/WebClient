import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Question';
import * as Entities from '../../entities';
import * as Components from '../../components';

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
            <div className="container">
                <p>Questions</p>
                <div>
                    {questions && questions.map((question:any )=> <Components.Question {...question}/>) }
                </div>
            </div>
        );
    }
}

export default Questions;
