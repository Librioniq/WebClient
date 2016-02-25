/// <reference path='../typings/main.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Store, compose, createStore, bindActionCreators, combineReducers} from 'redux';
import { connect, Provider} from 'react-redux';
import { Action } from 'redux-actions';
import { createHistory } from 'history'
import { Router, Route, Link } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


const initialState = {};

// const store: Store = createStore(rootReducer, initialState);

// ReactDOM.render(
//     <Provider store={store}></Provider>,
//     document.getElementById('app')
// );
