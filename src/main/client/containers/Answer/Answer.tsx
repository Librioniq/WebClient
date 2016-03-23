import * as React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from  '../../redux/modules/Answer';
import * as Entities from '../../entities';
import * as Components from '../../components';
import * as Containers from '../../containers';


interface AnswerProps extends React.Props<Answer>, Entities.Answer {
    create?: (parentId: number, answer: Entities.Answer) => void;
    update?: (parentId: number, answer: Entities.Answer) => void;
    delete?: (parentId: number, answerId: number) => void;
    comments?: Entities.Comment[];
}

interface AnswerState {
    edit: boolean;
    create: boolean;
}

@connect(
    () => ({}),
    dispatch => bindActionCreators({ create: Actions.create, update: Actions.update, delete: Actions.remove }, dispatch)
)
export class Answer extends React.Component<AnswerProps, AnswerState> {
    constructor(props: AnswerProps, context) {
        super(props, context);

        this.state = { edit: false, create: false };
    }

    public render() {
        // const {edit, create} = this.state;
        // const component = edit ? (<div/>) : create ? (<section/>) : ();

        return (
            <div>
                <Components.Answer {...this.props}/>
                <section>
                    <Containers.Comments comments = {this.props.comments}/>
                </section>
            </div>
        );
    }

    private onEdit() {
        this.setState({ edit: true, create: false });
    }

    private onSave() {
        if (this.state.create) {
            this.props.create(0, {} as any);
        } else if (this.state.edit) {
            this.props.update(0, {} as any);
        }
    }

    private onDelete() {
        this.props.delete(0, 0);
    }
}

export default Comment; 