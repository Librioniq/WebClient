import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assign } from 'lodash';
import { Actions } from  '../../redux/modules/Question';
import * as Entities from '../../entities';
import * as Containers from '../../containers';
import * as Components from '../../components';

interface QestionRoutingProps {
    id: number;
}

interface QuestionProps extends React.Props<Question>, RouteComponentProps<QestionRoutingProps, QestionRoutingProps>, Entities.Question {
    children?: React.ReactElement<any>;
    get: (questionId) => void;
    create?: (id, comment) => void;
}

@connect(
    state => assign({}, state.question),
    dispatch => bindActionCreators({ get: Actions.get }, dispatch)
)
export class Question extends React.Component<QuestionProps, void> {
    public componentWillMount() {
        const {get, params: {id}} = this.props;

        get(id);
    }

    public render() {
        return (
            <div>
                <div>
                    <Components.Question {...this.props}/>
                    <section>
                        <Containers.Comments {...this.props}/>
                    </section>
                </div>
                <div>
                    <Containers.Answers {...this.props}/>
                </div>
            </div>
        );
    }
}

export default Question;
