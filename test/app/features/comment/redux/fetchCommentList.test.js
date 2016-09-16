import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  FETCH_COMMENT_LIST_BEGIN,
  FETCH_COMMENT_LIST_SUCCESS,
  FETCH_COMMENT_LIST_FAILURE,
  FETCH_COMMENT_LIST_DISMISS_ERROR,
} from 'features/comment/redux/constants';

import {
  fetchCommentList,
  dismissFetchCommentListError,
  reducer,
} from 'features/comment/redux/fetchCommentList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('comment/redux/fetchCommentList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('action should handle fetchCommentList success', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: FETCH_COMMENT_LIST_BEGIN },
      { type: FETCH_COMMENT_LIST_SUCCESS, data: {} },
    ];

    return store.dispatch(fetchCommentList({ error: false }))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle fetchCommentList failure', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: FETCH_COMMENT_LIST_BEGIN },
      { type: FETCH_COMMENT_LIST_FAILURE, data: { error: 'some error' } },
    ];

    return store.dispatch(fetchCommentList({ error: true }))
      .catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle dismissFetchCommentListError', () => {
    const expectedAction = {
      type: FETCH_COMMENT_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchCommentListError()).to.deep.equal(expectedAction);
  });

  it('reducer should handle FETCH_COMMENT_LIST_BEGIN', () => {
    const prevState = { fetchCommentListPending: true };
    const state = reducer(
      prevState,
      { type: FETCH_COMMENT_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCommentListPending).to.be.true;
  });

  it('reducer should handle FETCH_COMMENT_LIST_SUCCESS', () => {
    const prevState = { fetchCommentListPending: true };
    const state = reducer(
      prevState,
      { type: FETCH_COMMENT_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCommentListPending).to.be.false;
  });

  it('reducer should handle FETCH_COMMENT_LIST_FAILURE', () => {
    const prevState = { fetchCommentListPending: true };
    const state = reducer(
      prevState,
      { type: FETCH_COMMENT_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCommentListPending).to.be.false;
    expect(state.fetchCommentListError).to.exist;
  });

  it('reducer should handle FETCH_COMMENT_LIST_DISMISS_ERROR', () => {
    const prevState = { fetchCommentListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: FETCH_COMMENT_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCommentListError).to.be.null;
  });
});
