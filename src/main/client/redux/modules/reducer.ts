import { combineReducers } from 'redux';
import { reduceReducers, mapToCollection, mergeState } from './utils';
import { routerReducer as routing } from 'react-router-redux';
import { Reducers as QuestionReducers } from './Question';
import { Reducers as AnswerReducers } from './Answer';
import { Reducers as CommentReducers } from './Comment';

/**
 * Here we combine all our reducer to next pesudo-fructal structure
 *
 * state
 *   |
 *   |-------questions : Array of Question
 *   |-------question : is Question
 *               |
 *               |-------id
 *               |-------title
 *               |-------content
 *               ~
 *               ~-------skip another params
 *               ~
 *               |-------comments : Array of Comments
 *               |-------answers : Array of Answers
 *                          |
 *                          |-------[0]
 *                          ~
 *                          ~
 *                          |-------[N] : is Answer
 *                                   |
 *                                   |-------id
 *                                   |-------content
 *                                   ~
 *                                   ~-------skip another params
 *                                   ~
 *                                   |-------comments : Array of Comments
 */
export default combineReducers({
    routing,
    questions: QuestionReducers.list,
    question: reduceReducers(
        QuestionReducers.create,
        QuestionReducers.failure,
        QuestionReducers.get,
        QuestionReducers.update,
        mergeState(
            combineReducers({
                answers: reduceReducers(
                    AnswerReducers.list,
                    mapToCollection(
                        reduceReducers(
                            AnswerReducers.create,
                            AnswerReducers.failure,
                            AnswerReducers.get,
                            AnswerReducers.update,
                            mergeState(
                                combineReducers({
                                    comments: undefined
                                })
                            )
                        )
                    )
                ),
                comments: reduceReducers(
                    CommentReducers.list,
                    mapToCollection(
                        reduceReducers(
                            CommentReducers.get,
                            CommentReducers.create,
                            CommentReducers.update,
                            CommentReducers.remove,
                            CommentReducers.failure
                        )
                    )
                )
            })
        )
    )
});
