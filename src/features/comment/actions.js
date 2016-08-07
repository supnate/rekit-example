import lean from 'leancloud-storage';
import {
  COMMENT_TEST_ACTION,
  SAVE_COMMENT_BEGIN,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_FAILURE,
  SAVE_COMMENT_DISMISS_ERROR,
  FETCH_COMMENT_LIST_BEGIN,
  FETCH_COMMENT_LIST_SUCCESS,
  FETCH_COMMENT_LIST_FAILURE,
  FETCH_COMMENT_LIST_DISMISS_ERROR,
} from './constants';

export function commentTestAction() {
  return {
    type: COMMENT_TEST_ACTION,
  };
}

/* ===== SaveComment ===== */
export function saveComment(topicId, data) {
  return (dispatch) => {
    dispatch({
      type: SAVE_COMMENT_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const Comment = lean.Object.extend('Comment');
      const comment = new Comment();
      const topic = new lean.Object.createWithoutData('Topic', topicId);
      comment.save({
        ...data,
        topic,
      }).then(res => {
        dispatch({
          type: SAVE_COMMENT_SUCCESS,
          data: res,
        });
        resolve();
      }).catch(err => {
        dispatch({
          type: SAVE_COMMENT_FAILURE,
          data: {
            error: err,
          },
        });
        reject();
      });
    });

    return promise;
  };
}

export function dismissSaveCommentError() {
  return {
    type: SAVE_COMMENT_DISMISS_ERROR,
  };
}

/* ===== FetchCommentList ===== */
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
