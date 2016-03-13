/// <reference path='../../typings/main.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './client/redux/create';

import Routes from './client/routes';

const initialState = {};
const store: Store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history}>
                <Routes/>
            </Router>
        </Provider>
    ),
    document.getElementById('app')
);
