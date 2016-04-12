import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Questions, Question, SignIn, SignOut, NotFound }  from '../containers';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Questions}/>
        <Route path="questions/">
            <IndexRoute component={Questions}/>
            <Route path="ask" component={Question} onEnter={({}, r) => localStorage.getItem("auth") ? void (0) : r("/signin") } />
            <Route path=":id" component={Question}/>
        </Route>
        <Route path="about" component={Home}/>
        <Route path="signin" component={SignIn}/>
        <Route path="signout" component={SignOut}/>
        <Route path="*" component={NotFound}/>
    </Route>
);

export default routes;