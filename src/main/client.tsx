/// <reference path='../../typings/main.d.ts'/>
/// <reference path='server/environment.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './client/redux/create';
import routes from './client/routes';
import * as Providers from './client/providers';

const initialState = {};
const store: Store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    (
        <Provider store={store}>
            <Providers.Auth>
                <Router history={history} routes={routes}/>
            </Providers.Auth>
        </Provider>
    ),
    document.getElementById('app')
);
