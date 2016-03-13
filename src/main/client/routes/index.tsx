import * as React from 'react';
import { Route, IndexRoute} from 'react-router';

import { App, Home }  from '../containers';
import { Comment, Question } from '../components';

export const Routes = () => (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="comment" component={Comment}/>
        <Route path="question" component={Question}/>
    </Route>
);

export default Routes;