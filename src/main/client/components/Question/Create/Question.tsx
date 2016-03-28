import * as React from "react";
import * as Entities from '../../../entities';
import { MarkdownViewer } from '../../../components';


interface QuestionProps extends Entities.Question {
    onEdit?: () => void;
    onDelete?: () => void;
}

export class Question extends React.Component<QuestionProps, any> {
    public render() {
        // const { title, tags, content, createdBy } = this.props;

        return (
            <div>
            </div>
        );
    }

    private onEdit() {
        this.props.onEdit();
    }

    private onDelete() {
        this.props.onDelete();
    }
}

export default Question;
