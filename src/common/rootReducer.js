import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/reducer';
import topicReducer from '../features/topic/reducer';
import categoryReducer from '../features/category/reducer';
import commentReducer from '../features/comment/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  home: homeReducer,
  topic: topicReducer,
  category: categoryReducer,
  comment: commentReducer,
});

export default rootReducer;
