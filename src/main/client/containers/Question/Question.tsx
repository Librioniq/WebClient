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
    (s, {params: {id} = { id: undefined }}) => assign({}, s.questions.filter(it => it.id === Number(id))[0]),
    dispatch => bindActionCreators({ get: Actions.get }, dispatch)
)
export class Question extends React.Component<QuestionProps, void> {
    public componentWillMount() {
        const {get, params: {id}} = this.props;

        if (id === undefined) {
            return;
        }

        get(id);
    }

    public render() {
        return (
            <div>
                <div>
                    <Components.Question {...this.props}/>
                    {this.renderComments() }
                </div>
                <div>
                    {this.renderAnswers() }
                </div>
            </div>
        );
    }

    private renderComments() {
        const {id} = this.props;

        return id !== undefined ? (<Containers.Comments parentId = {id}/>) : (<div>Loading...</div>);
    }

    private renderAnswers() {
        const {id} = this.props;

        return id !== undefined ? (<Containers.Answers parentId = {id}/>) : (<div>Loading...</div>);
    }
}

export default Question;
