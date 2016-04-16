import * as React from 'react';
import * as Entities from '../../entities';


import Editor from '../Editor/Editor'


const css: any = require('./css/Comment.scss');

interface Props {
    comment: Entities.Comment;
}

function ReadComment(props: Props) {
    return (
        <div className={css.comment}>
            <span className={css.content}>{props.comment.content}</span>
            <section className={css.info}>
                <a href="#" className={css.link}>{props.comment.createdBy}</a>
                <span className={css.helper}>{props.comment.createdDate}</span>
            </section>
        </div>
    )
}

export default ReadComment;
