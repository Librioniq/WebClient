import { combineReducers } from 'redux';
import { reduceReducers} from './utils';
import { routerReducer as routing } from 'react-router-redux';
import { Reducers as QuestionReducers } from './Question';
import { Reducers as AnswerReducers } from './Answer';
import { Reducers as CommentReducers } from './Comment';
import { Reducers as UserReducers } from './User';
import { Reducers as AuthReducers } from './Auth';

/**
 * Here we combine all our reducer to next structure
 */
export default combineReducers({
    routing,
    auth: reduceReducers(
        AuthReducers.authorize,
        AuthReducers.failure
    ),
    users: reduceReducers(
        UserReducers.get,
        UserReducers.failure
    ),
    questions: reduceReducers(
        QuestionReducers.list,
        QuestionReducers.create,
        QuestionReducers.failure,
        QuestionReducers.get,
        QuestionReducers.update,
        QuestionReducers.remove
    ),
    answers: reduceReducers(
        AnswerReducers.list,
        AnswerReducers.create,
        AnswerReducers.failure,
        AnswerReducers.get,
        AnswerReducers.update,
        AnswerReducers.remove
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
