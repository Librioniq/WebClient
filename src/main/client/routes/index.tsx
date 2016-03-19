import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Questions }  from '../containers';
import { Question } from '../components';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Questions}/>
        <Route path="questions" component={Questions}/>
        <Route path="question/:id" component={Question}/>
        <Route path="about" component={Home}/>
    </Route>
);

export default routes;