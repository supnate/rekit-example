import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import lean from 'leancloud-storage';
import helpers from '../../../helpers';

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
  before(() => {
    helpers.beforeMock(lean);
  });

  afterEach(() => {
    nock.cleanAll();
    helpers.unMock();
  });

  it('action should handle fetchCommentList success', () => {
    const store = mockStore({});
    helpers.mockLeanQuery({}, []);
    const expectedActions = [
      { type: FETCH_COMMENT_LIST_BEGIN },
      { type: FETCH_COMMENT_LIST_SUCCESS, data: [], args: { topicId: 'id-1' } },
    ];

    return store.dispatch(fetchCommentList('id-1'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle fetchCommentList failure', () => {
    const store = mockStore({});
    helpers.mockLeanQueryFailure('some error');
    const expectedActions = [
      { type: FETCH_COMMENT_LIST_BEGIN },
      { type: FETCH_COMMENT_LIST_FAILURE, data: { error: 'some error' } },
    ];

    return store.dispatch(fetchCommentList('id-1'))
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
      { type: FETCH_COMMENT_LIST_SUCCESS, data: {}, args: { topicId: 'id-1' } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchCommentListPending).to.be.false;
    expect(state.topicId).to.equal('id-1');
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
