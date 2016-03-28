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

@connect(
    (s, p) => ({ answers: s.answers.filter(it => it.parentId === p.parentId) }),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch)
)
export class Answers extends React.Component<AnswersProps, any> {
    public componentWillMount() {
        const {parentId, list} = this.props;

        list(parentId);
    }

    public render() {
        const {answers, parentId} = this.props;

        return (
            <div className = { "container" }>
                {answers && answers.map(answer => <Containers.Answer answer = { answer } parentId = { parentId }/>) }
            </div>
        );
    }
}

export default Answers;
