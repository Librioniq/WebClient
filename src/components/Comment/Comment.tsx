'use strict';

import * as React from "react";

const styles: any = require('./comment.css');
const color: any = require('../../theme/color.css');

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
            <div className={styles.comment}>
                <span>{content} - </span>
                <a href="link_to_user" className={color.link}>{author}</a>
                <span className={color.helper}> {date}</span>
                <span className={color.helper}> at {time}</span>
            </div>
        );
    }
}

export default Comment;
