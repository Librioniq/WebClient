import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import middleware from './middleware/post';
import reducer from './modules/reducer';
import {DevTools} from '../containers';

const enhancer = compose(
    applyMiddleware(thunk, middleware),
    persistState(
        String(window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        ))
    ),
    DevTools.instrument()
);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer as any);

    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //         store.replaceReducer(require('../reducers').default)
    //     );
    // }

    return store;
}
