import initialState from './initialState';
import { reducer as saveTopic } from './saveTopic';
import { reducer as fetchTopicList } from './fetchTopicList';
import { reducer as getTopic } from './getTopic';

const reducers = [
  saveTopic,
  fetchTopicList,
  getTopic,
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
