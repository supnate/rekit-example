import lean from 'leancloud-storage';
import {
  SAVE_TOPIC_BEGIN,
  SAVE_TOPIC_SUCCESS,
  SAVE_TOPIC_FAILURE,
  SAVE_TOPIC_DISMISS_ERROR,
} from './constants';

export function saveTopic(data) {
  return (dispatch) => {
    dispatch({
      type: SAVE_TOPIC_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const Topic = lean.Object.extend('Topic');
      const topic = new Topic();
      topic.save(data).then(() => {
        dispatch({
          type: SAVE_TOPIC_SUCCESS,
          data: {},
        });
        resolve();
      }, (err) => {
        dispatch({
          type: SAVE_TOPIC_FAILURE,
          data: {
            error: err,
          },
        });
        reject();
      });
    }).catch(() => {});

    return promise;
  };
}

export function dismissSaveTopicError() {
  return {
    type: SAVE_TOPIC_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SAVE_TOPIC_BEGIN:
      return {
        ...state,
        saveTopicPending: true,
      };

    case SAVE_TOPIC_SUCCESS:
      return {
        ...state,
        needReloadList: true,
        saveTopicPending: false,
      };

    case SAVE_TOPIC_FAILURE:
      return {
        ...state,
        saveTopicPending: false,
        saveTopicError: action.data.error,
      };

    case SAVE_TOPIC_DISMISS_ERROR:
      return {
        ...state,
        saveTopicError: null,
      };

    default:
      return state;
  }
}
