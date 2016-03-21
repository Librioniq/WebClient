import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assign } from 'lodash';
import Modules from  '../../redux/modules';
import * as Entities from '../../entities';
import * as Components from '../../components';

interface QestionRoutingProps {
    id: number;
}

interface QuestionProps extends React.Props<Question>, RouteComponentProps<QestionRoutingProps, QestionRoutingProps>, Entities.Question {
    answers?: Array<Entities.Answer>;
    comments?: Array<Entities.Comment>;
    children?: React.ReactElement<any>;
    list: (questionId) => void;
    get: (questionId) => void;
}


@connect(
    state => assign({}, state.question),
    dispatch => bindActionCreators({ list: Modules.Answer.Actions.list, get: Modules.Question.Actions.get }, dispatch)
)
export class Question extends React.Component<QuestionProps, void> {
    public componentWillMount() {
        const {list, get, params: {id}} = this.props;

        get(id);
        list(id);
    }

    public render() {
        const {answers} = this.props;

        return (
            <div>
                <Components.Question {...this.props}/>
                <div>
                    {answers && answers.map(answer => <Components.Answer {...answer}/>) }
                </div>
            </div>
        );
    }
}

export default Question;
