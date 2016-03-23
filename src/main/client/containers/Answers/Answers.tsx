import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Answer';
import * as Entities from '../../entities';
import * as Containers from '../../containers';


interface AnswersProps extends React.Props<Answers> {
    answers?: Array<Entities.Answer>;
    list?: (id: number) => any;
}

@connect(
    () => ({}),
    dispatch => bindActionCreators({ list: Actions.list }, dispatch)
)
export class Answers extends React.Component<AnswersProps, any> {
    public componentWillMount() {
        this.props.list(0);
    }

    public render() {
        const {answers} = this.props;

        return (
            <div className="container">
                {answers && answers.map(answer => <Containers.Answer {...answer}/>) }
            </div>
        );
    }
}

export default Answers;
