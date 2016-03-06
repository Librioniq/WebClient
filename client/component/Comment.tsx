import * as React from "react";
const color:any = require('../css/color.css');

interface CommentProps {
  author?: string;
  content?: string,
  date?: string;
  time?: string;
}

interface CommentState {
  text: string;
}

class Comment extends React.Component<CommentProps, CommentState>{

    constructor(props) {
        super(props);
    }

    render() {
        const author = this.props.author || 'KobeJohn',
              content = this.props.content || 'If you come back to this, maybe you should change the accepted answer from diaspora.',
              date = this.props.date || 'Feb 5 12',
              time = this.props.time || '13:35';
        return (
            <div className="comment">
              <span>{content} - </span>
              <a href="link_to_user" className={color.link}>{author}</a>
              <span className={color.light}> {date}</span>
              <span className={color.light}> at {time}</span>
            </div>
        );
    }
}

export default Comment;
