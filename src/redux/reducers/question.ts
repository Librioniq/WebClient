import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { CommentModel } from '../../models/comment';
import { QuestionModel } from '../../models/question';

const ADD_COMMENT = 'ADD_COMMENT';

const initialState = [<CommentModel>{
  text: ''
}];

export default handleActions<CommentModel[]>({
  [ADD_COMMENT]: (state: CommentModel[], action: Action): CommentModel[] => {
    return [{
      content: action.payload.content
    }, ...state];
  }
}, initialState);
