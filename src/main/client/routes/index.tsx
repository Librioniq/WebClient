import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Questions, Question, SignIn, SignOut }  from '../containers';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Questions}/>
        <Route path="questions/">
            <IndexRoute component={Questions}/>
            <Route path="ask" component={Question}/>
            <Route path=":id" component={Question}/>
        </Route>
        <Route path="about" component={Home}/>
        <Route path="signin" component={SignIn}/>
        <Route path="signout" component={SignOut}/>
    </Route>
);

export default routes;