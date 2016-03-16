import * as React from 'react';
import { Route, IndexRoute} from 'react-router';

import { App, Home, Questions }  from '../containers';
import { Comment, Question } from '../components';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="comment" component={Comment}/>
        <Route path="question" component={Question}/>
        <Route path="questions" component={Questions}/>
    </Route>
);

export default routes;