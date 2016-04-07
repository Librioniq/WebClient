import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Questions, Question, SignIn }  from '../containers';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Questions}/>
        <Route path="questions/">
            <IndexRoute component={Questions}/>
            <Route path=":id" component={Question}/>
            <Route path="ask" component={Question}/>
        </Route>
        <Route path="about" component={Home}/>
        <Route path="signin" component={SignIn}/>
    </Route>
);

export default routes;