import { createAction, Action } from 'redux-actions';
import { assign } from 'lodash';

import { CommentModel } from '../../models/comment';

const ADD_COMMENT = 'ADD_COMMENT';

const addComment = createAction<CommentModel>(
  ADD_COMMENT,
  (content: string) => ({ content })
);

export {
  addComment
}
