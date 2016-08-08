import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topicReducer from '../features/topic/reducer';
import commentReducer from '../features/comment/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  topic: topicReducer,
  comment: commentReducer,
});

export default rootReducer;
