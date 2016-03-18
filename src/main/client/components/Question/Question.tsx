import * as React from "react";
import * as Entities from '../../entities';
import { Comment, Editor } from '../../components';

const css = require('./Question.scss');

interface QuestionProps extends React.Props<Question>, Entities.Question {
    comments?: Entities.Comment[];
}

export class Question extends React.Component<QuestionProps, {}> {

    constructor(props, context) {
        console.log(props, context);
        super(props, context)
        this.state = {
            createdBy: 'Derebasov'
        }
    }

    handleAddComment(text) {
        // this.props.addTodo(text);
    }

    public render() {
        const { createdBy, title, content, createdDate, comments, tags } = this.props;

        return (
            <div className={css.root}>
                <header>
                    <a href="#" className={css.title}>"test"</a>
                    <section>{tags && tags.map(tag => <a href="#" className={css.tag}>{tag}</a>) }</section>
                </header>
                <div className={css.content}>{content}</div>
                <section className={css.owner}>{createdBy}</section>
                <section className={css.comments}>
                    {comments && comments.map(comment => <Comment {...comment} />) }
                    <Editor />
                    <button onClick={() => {
                        // store.dispatch({
                        //     type: 'ADD_COMMENT',
                        //     text: 'test'
                        // });
                    }}>Add comment asdasdasd</button>
                </section>

            </div>
        );
    }
}

export default Question;
