import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {listQuestion} from  '../../redux/modules/question';

import {Question} from '../../redux/entities';

interface QuestionsProps extends React.Props<Questions> {
    questions: Array<Question>;
    listQuestion: () => any;
}
@connect(
    state => ({ questions: state.questions }),
    dispatch => bindActionCreators({ listQuestion }, dispatch)
)
export class Questions extends React.Component<QuestionsProps, void> {
    public componentWillMount() {
        this.props.listQuestion();
    }

    public render() {
        return (
            <div className="container">
                <p>Questions</p>
                <div>
                    {this.props.questions.map(question =>
                        (
                            <div className="question">
                                <span className="text">{ question.content } - </span>
                                <a href="link_to_user" className="author">{ question.createdBy }</a>
                                <span className="date">{ question.createdDate }</span>
                                <span className="time"> at { question.createdDate }</span>
                            </div>
                        )
                    ) }
                </div>
            </div>
        );
    }
}

export default Questions;