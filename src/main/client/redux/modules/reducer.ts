import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import editor from './editor';

export default combineReducers({
    routing,
    editor
});