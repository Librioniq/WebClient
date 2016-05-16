import { Model } from './Model';
import Editor from '../editor/Editor'

import * as React from 'react';

const css: any = require('./Comment.scss');

interface Props {
    comment: Model;
}

export function Read(props: Props) {
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
