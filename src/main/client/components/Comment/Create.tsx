import * as React from "react";
import * as Entities from '../../entities';


export class Comment extends React.Component<Entities.Comment, any> {
    public render() {
        const { createdBy, createdDate, content} = this.props;

        return (
            <div>
            </div>
        );
    }
}

export default Comment;
