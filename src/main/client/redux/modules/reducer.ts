import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import editor from './editor';
import question from './question';
import { create } from './comment';

export default combineReducers({
    routing,
    editor,
    question,
    create
});
