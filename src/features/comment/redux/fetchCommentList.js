import lean from 'leancloud-storage';
import {
  FETCH_COMMENT_LIST_BEGIN,
  FETCH_COMMENT_LIST_SUCCESS,
  FETCH_COMMENT_LIST_FAILURE,
  FETCH_COMMENT_LIST_DISMISS_ERROR,
} from './constants';

export function fetchCommentList(topicId) {
  return dispatch => {
    dispatch({
      type: FETCH_COMMENT_LIST_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const query = new lean.Query('Comment');
      const topic = lean.Object.createWithoutData('Topic', topicId);
      query.limit(500);
      query.equalTo('topic', topic);
      query.descending('createdAt');
      query.find().then(res => {
        dispatch({
          type: FETCH_COMMENT_LIST_SUCCESS,
          data: res,
          args: {
            topicId,
          },
        });
        resolve();
      }, err => {
        dispatch({
          type: FETCH_COMMENT_LIST_FAILURE,
          data: {
            error: err,
          },
        });
        reject(err);
      });
    }).catch(() => {});

    return promise;
  };
}

export function dismissFetchCommentListError() {
  return {
    type: FETCH_COMMENT_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_COMMENT_LIST_BEGIN:
      return {
        ...state,
        fetchCommentListPending: true,
      };

    case FETCH_COMMENT_LIST_SUCCESS:
      return {
        ...state,
        topicId: action.args.topicId,
        needReloadList: false,
        listData: action.data,
        fetchCommentListPending: false,
      };

    case FETCH_COMMENT_LIST_FAILURE:
      return {
        ...state,
        fetchCommentListPending: false,
        fetchCommentListError: action.data.error,
      };

    case FETCH_COMMENT_LIST_DISMISS_ERROR:
      return {
        ...state,
        fetchCommentListError: null,
      };

    default:
      return state;
  }
}
