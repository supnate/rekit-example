import initialState from './initialState';
import { reducer as saveComment } from './saveComment';
import { reducer as fetchCommentList } from './fetchCommentList';

const reducers = [
  saveComment,
  fetchCommentList,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
