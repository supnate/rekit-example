import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SAVE_COMMENT_BEGIN,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_FAILURE,
  SAVE_COMMENT_DISMISS_ERROR,
} from 'features/comment/redux/constants';

import {
  saveComment,
  dismissSaveCommentError,
  reducer,
} from 'features/comment/redux/saveComment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('comment/redux/saveComment', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('action should handle saveComment success', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: SAVE_COMMENT_BEGIN },
      { type: SAVE_COMMENT_SUCCESS, data: {} },
    ];

    return store.dispatch(saveComment({ error: false }))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle saveComment failure', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: SAVE_COMMENT_BEGIN },
      { type: SAVE_COMMENT_FAILURE, data: { error: 'some error' } },
    ];

    return store.dispatch(saveComment({ error: true }))
      .catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle dismissSaveCommentError', () => {
    const expectedAction = {
      type: SAVE_COMMENT_DISMISS_ERROR,
    };
    expect(dismissSaveCommentError()).to.deep.equal(expectedAction);
  });

  it('reducer should handle SAVE_COMMENT_BEGIN', () => {
    const prevState = { saveCommentPending: true };
    const state = reducer(
      prevState,
      { type: SAVE_COMMENT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveCommentPending).to.be.true;
  });

  it('reducer should handle SAVE_COMMENT_SUCCESS', () => {
    const prevState = { saveCommentPending: true };
    const state = reducer(
      prevState,
      { type: SAVE_COMMENT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveCommentPending).to.be.false;
  });

  it('reducer should handle SAVE_COMMENT_FAILURE', () => {
    const prevState = { saveCommentPending: true };
    const state = reducer(
      prevState,
      { type: SAVE_COMMENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveCommentPending).to.be.false;
    expect(state.saveCommentError).to.exist;
  });

  it('reducer should handle SAVE_COMMENT_DISMISS_ERROR', () => {
    const prevState = { saveCommentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SAVE_COMMENT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveCommentError).to.be.null;
  });
});
