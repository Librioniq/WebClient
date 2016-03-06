import * as React from "react";
import Comment from './comment/Comment';
const color:any = require('../css/color.css');

interface CommentProps {
  author?: string;
  content?: string,
  date?: string;
  time?: string;
}

interface CommentArray {
    [index: number]: CommentProps;
    length: number;
}

interface TagArray {
    [index: number]: string;
    length: number;
}

interface AnswerProps {
    comments?: CommentArray;
    title?: string;
    content?: string;
    author?: string;
}

interface AnswerState {
    editable: boolean;
}

class Answer extends React.Component<AnswerProps, AnswerState>{

    constructor(props, context) {
        super(props, context);
        this.state = {
          editable: false
        };
    }

    render() {
        // var comments = this.props.comments;
        var comments = [{
            author: 'KobeJohn',
            content: 'If you come back to this, maybe you should change the accepted answer from diaspora.',
            date: 'Feb 5 12',
            time: '13:35'
        },{
            author: 'KobeJohns',
            content: 'If you come back to this, maybe you should change the accepted answer from diaspora.',
            date: 'Feb 4 12',
            time: '13:34'
        }];

        this.props.title = 'Why shouldnt I use mysql_* functions in PHP?';
        this.props.content = 'Why should I use something else even if they work on my site?';
        this.props.author = 'Madara Uchiha';

        const hasComments = comments.length > 0;
        const nodes = !hasComments ?
          <em></em> :
          comments.map(comment =>
            <Comment
              author={comment.author}
              content={comment.content}
              date={comment.date}
              time={comment.time} />
        )

        return (
            <div>
              <h1>{this.props.title}</h1>
              <hr />
              <div>{this.props.content}</div>
              <div>{this.props.author}</div>
              <hr />
              <div>{nodes}</div>
            </div>
        );
    }
}

export default Answer;
