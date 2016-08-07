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

const initialState = {
  listData: [],
  topicId: null,
  needReloadList: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case COMMENT_TEST_ACTION:
      return {
        ...state,
      };

    /* ===== SaveComment ===== */
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

    /* ===== FetchCommentList ===== */
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

