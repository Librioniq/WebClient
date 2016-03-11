/// <reference path='../typings/main.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './redux/create';

import { App, Home }  from './containers';
import { Comment, Question } from './components';


const initialState = {};
const store: Store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="comment" component={Comment}/>
                    <Route path="question" component={Question}/>
                </Route>
            </Router>
        </Provider>
    ),
    document.getElementById('app')
);
