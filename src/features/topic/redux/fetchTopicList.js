import lean from 'leancloud-storage';
import {
  FETCH_TOPIC_LIST_BEGIN,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAILURE,
  FETCH_TOPIC_LIST_DISMISS_ERROR,
} from './constants';

export function fetchTopicList() {
  return (dispatch) => {
    dispatch({
      type: FETCH_TOPIC_LIST_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const query = new lean.Query('Topic');
      query.limit(50);
      query.descending('createdAt');
      query.find().then((res) => {
        dispatch({
          type: FETCH_TOPIC_LIST_SUCCESS,
          data: res,
        });
        resolve();
      }, (err) => {
        dispatch({
          type: FETCH_TOPIC_LIST_FAILURE,
          data: {
            error: err,
          },
        });
        reject(err);
      });
    });

    return promise;
  };
}

export function dismissFetchTopicListError() {
  return {
    type: FETCH_TOPIC_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_TOPIC_LIST_BEGIN:
      return {
        ...state,
        fetchTopicListPending: true,
      };

    case FETCH_TOPIC_LIST_SUCCESS:
      return {
        ...state,
        needReloadList: false,
        listData: action.data,
        fetchTopicListPending: false,
      };

    case FETCH_TOPIC_LIST_FAILURE:
      return {
        ...state,
        fetchTopicListPending: false,
        fetchTopicListError: action.data.error,
      };

    case FETCH_TOPIC_LIST_DISMISS_ERROR:
      return {
        ...state,
        fetchTopicListError: null,
      };

    default:
      return state;
  }
}
