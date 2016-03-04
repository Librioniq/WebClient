/// <reference path='../typings/main.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Store, compose, createStore, bindActionCreators, combineReducers} from 'redux';
import { connect, Provider} from 'react-redux';
import { Action } from 'redux-actions';
import { createHistory } from 'history'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App  from './component/App';
import Home  from './component/Home';
import Test1  from './component/Test1';
import Test2  from './component/Test2';
import Comment from './component/comment/Comment';


const initialState = {};
const reducer = combineReducers({
    routing: routerReducer
});
const store: Store = createStore(reducer, initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    (
        <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="t1" component={Test1}/>
            <Route path="comment" component={Comment}/>
              <Route path="t2" component={Test2}/>
              </Route>
          </Router>
        </Provider>
    ),
    document.getElementById('app')
);
