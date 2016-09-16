import lean from 'leancloud-storage';
import {
  GET_TOPIC_BEGIN,
  GET_TOPIC_SUCCESS,
  GET_TOPIC_FAILURE,
  GET_TOPIC_DISMISS_ERROR,
} from './constants';

export function getTopic(topicId) {
  return (dispatch) => {
    dispatch({
      type: GET_TOPIC_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const query = new lean.Query('Topic');
      query.get(topicId).then((res) => {
        dispatch({
          type: GET_TOPIC_SUCCESS,
          data: res,
        });
        resolve();
      }, (err) => {
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

export function reducer(state, action) {
  switch (action.type) {
    case GET_TOPIC_BEGIN:
      return {
        ...state,
        getTopicPending: true,
      };

    case GET_TOPIC_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.data.id]: action.data,
        },
        getTopicPending: false,
      };

    case GET_TOPIC_FAILURE:
      return {
        ...state,
        getTopicError: action.data.error,
      };

    case GET_TOPIC_DISMISS_ERROR:
      return {
        ...state,
        getTopicError: null,
      };

    default:
      return state;
  }
}
