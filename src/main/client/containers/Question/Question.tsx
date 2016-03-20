import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assign } from 'lodash';
import { Reducers } from  '../../redux/modules/Question';
import * as Entities from '../../entities';
import * as Components from '../../components';

interface QuestionProps extends React.Props<Question>, Entities.Question {
    answers?: Array<Entities.Answer>;
    comments?: Array<Entities.Comment>;
}


@connect(
    state => assign({}, state.question),
    dispatch => bindActionCreators({ list: Reducers.list }, dispatch)
)
export class Question extends React.Component<QuestionProps, void> {
    public render() {
        const {answers} = this.props;

        return (
            <div>
                <Components.Question {...this.props}/>
                {answers.map(answer => <Components.Answer {...answer}/>) }
            </div>
        );
    }
}

export default Question;
