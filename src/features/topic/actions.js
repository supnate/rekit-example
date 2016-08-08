import lean from 'leancloud-storage';
import {
  SAVE_TOPIC_BEGIN,
  SAVE_TOPIC_SUCCESS,
  SAVE_TOPIC_FAILURE,
  SAVE_TOPIC_DISMISS_ERROR,
  FETCH_TOPIC_LIST_BEGIN,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAILURE,
  FETCH_TOPIC_LIST_DISMISS_ERROR,
  GET_TOPIC_BEGIN,
  GET_TOPIC_SUCCESS,
  GET_TOPIC_FAILURE,
  GET_TOPIC_DISMISS_ERROR,
} from './constants';

/* ===== SaveTopic ===== */
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

/* ===== FetchTopicList ===== */
export function fetchTopicList() {
  return dispatch => {
    dispatch({
      type: FETCH_TOPIC_LIST_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const query = new lean.Query('Topic');
      query.limit(50);
      query.descending('createdAt');
      query.find().then(res => {
        dispatch({
          type: FETCH_TOPIC_LIST_SUCCESS,
          data: res,
        });
        resolve();
      }, err => {
        dispatch({
          type: FETCH_TOPIC_LIST_FAILURE,
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

export function dismissFetchTopicListError() {
  return {
    type: FETCH_TOPIC_LIST_DISMISS_ERROR,
  };
}

/* ===== GetTopic ===== */
export function getTopic(topicId) {
  return (dispatch) => {
    dispatch({
      type: GET_TOPIC_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const query = new lean.Query('Topic');
      query.get(topicId).then(res => {
        dispatch({
          type: GET_TOPIC_SUCCESS,
          data: res,
        });
        resolve();
      }, err => {
        dispatch({
          type: GET_TOPIC_FAILURE,
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

export function dismissGetTopicError() {
  return {
    type: GET_TOPIC_DISMISS_ERROR,
  };
}
