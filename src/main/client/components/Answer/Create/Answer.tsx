import * as React from "react";
import * as Entities from '../../../entities';


export class Answer extends React.Component<Entities.Answer, any> {
    public render() {
        const { createdBy, createdDate, content} = this.props;

        return (
            <div>
            </div>
        );
    }
}

export default Answer;
