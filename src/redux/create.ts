import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import * as thunk from 'redux-thunk';
import reducer from './modules/reducer';
import {DevTools} from '../containers';

declare const module: any;

const enhancer = compose(
    applyMiddleware((<any>thunk).default),
    persistState(
        String(window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        ))
    ),
    DevTools.instrument()
);

console.log(enhancer);
console.log(thunk);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer as any);

    console.log(store);

    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //         store.replaceReducer(require('../reducers').default)
    //     );
    // }

    return store;
}