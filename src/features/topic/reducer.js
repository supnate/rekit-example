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

const initialState = {
  byId: {},
  pageSize: 10,
  currentPage: 1,
  needReloadList: true,
  listData: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    /* ===== SaveTopic ===== */
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
        saveTopicError: action.data.error,
      };

    case SAVE_TOPIC_DISMISS_ERROR:
      return {
        ...state,
        saveTopicError: null,
      };

    /* ===== FetchTopicList ===== */
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
        fetchTopicListError: action.data.error,
      };

    case FETCH_TOPIC_LIST_DISMISS_ERROR:
      return {
        ...state,
        fetchTopicListError: null,
      };

    /* ===== GetTopic ===== */
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

