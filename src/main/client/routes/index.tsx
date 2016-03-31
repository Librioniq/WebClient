import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Questions, Question }  from '../containers';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Questions}/>
        <Route path="questions/">
            <IndexRoute component={Questions}/>
            <Route path=":id" component={Question}/>
            <Route path="ask" component={Question}/>
        </Route>
        <Route path="about" component={Home}/>
    </Route>
);

export default routes;