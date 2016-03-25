import { combineReducers } from 'redux';
import { reduceReducers} from './utils';
import { routerReducer as routing } from 'react-router-redux';
import { Reducers as QuestionReducers } from './Question';
import { Reducers as AnswerReducers } from './Answer';
import { Reducers as CommentReducers } from './Comment';

/**
 * Here we combine all our reducer to next structure
 */
export default combineReducers({
    routing,
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
