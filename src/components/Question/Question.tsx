import * as React from "react";

export class Question extends React.Component<{}, void> {

    constructor(props) {
        super(props);
    }

    public render() {
        const author = 'KobeJohn',
            content = 'If you come back to this, maybe you should change the accepted answer from diaspora.',
            date = 'Feb 5 12',
            time = '13:35';
        return (
            <div className="comment">
                <span className="text">{content} - </span>
                <a href="link_to_user" className="author">{author}</a>
                <span className="date"> {date}</span>
                <span className="time"> at {time}</span>
            </div>
        );
    }
}

export default Question;
