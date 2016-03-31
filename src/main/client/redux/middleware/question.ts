import {push} from 'react-router-redux';
import {Status} from './Status';


export default ({dispatch}) => next => action => { // can be used with sotre like store=>next=>actoion=>...
    const regex = /^api\/QUESTION:POST?$/i;
    const isQuestionAPICall = regex.test(action.type);

    if (!isQuestionAPICall || action.status !== Status.SUCCESS) {
        return next(action);
    }

    console.log("entered", action);
    next(action);
    dispatch(push(`/questions/${action.question.id}`));
}
