import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topicReducer from '../features/topic/reducer';
import categoryReducer from '../features/category/reducer';
import commentReducer from '../features/comment/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  topic: topicReducer,
  category: categoryReducer,
  comment: commentReducer,
});

export default rootReducer;
