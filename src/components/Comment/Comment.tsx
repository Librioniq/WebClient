import * as React from "react";
// import * as styles from 'comment.css';

// declare var require: {
//     <T>(path: string): T;
// };

const styles: any = require('./Comment.scss');

export class Comment extends React.Component<{
    author: 'KobeJohn',
    content: 'If you come back to this, maybe you should change the accepted answer from diaspora.',
    date: 'Feb 5 12',
    time: '13:35'
}, void> {

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
                <span className={styles.text}>{content} - </span>
                <a href="link_to_user" className="author">{author}</a>
                <span className={styles.date}> {date}</span>
                <span className={styles.time}> at {time}</span>
            </div>
        );
    }
}

export default Comment;
