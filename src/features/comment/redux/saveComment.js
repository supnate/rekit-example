import lean from 'leancloud-storage';
import {
  SAVE_COMMENT_BEGIN,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_FAILURE,
  SAVE_COMMENT_DISMISS_ERROR,
} from './constants';

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
      }, err => {
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

export function reducer(state, action) {
  switch (action.type) {
    case SAVE_COMMENT_BEGIN:
      return {
        ...state,
        saveCommentPending: true,
      };

    case SAVE_COMMENT_SUCCESS:
      return {
        ...state,
        needReloadList: true,
        saveCommentPending: false,
      };

    case SAVE_COMMENT_FAILURE:
      return {
        ...state,
        saveCommentPending: false,
        saveCommentError: action.data.error,
      };

    case SAVE_COMMENT_DISMISS_ERROR:
      return {
        ...state,
        saveCommentError: null,
      };

    default:
      return state;
  }
}
