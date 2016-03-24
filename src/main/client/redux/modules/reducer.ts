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
    questions: reduceReducers(
        QuestionReducers.list,
        QuestionReducers.create,
        QuestionReducers.failure,
        QuestionReducers.get,
        QuestionReducers.update
    ),
    answers: reduceReducers(
        AnswerReducers.list,
        AnswerReducers.create,
        AnswerReducers.failure,
        AnswerReducers.get,
        AnswerReducers.update
    ),
    comments: reduceReducers(
        CommentReducers.list,
        CommentReducers.get,
        CommentReducers.create,
        CommentReducers.update,
        CommentReducers.remove,
        CommentReducers.failure
    )
});
