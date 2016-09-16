import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SAVE_TOPIC_BEGIN,
  SAVE_TOPIC_SUCCESS,
  SAVE_TOPIC_FAILURE,
  SAVE_TOPIC_DISMISS_ERROR,
} from 'features/topic/redux/constants';

import {
  saveTopic,
  dismissSaveTopicError,
  reducer,
} from 'features/topic/redux/saveTopic';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topic/redux/saveTopic', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('action should handle saveTopic success', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: SAVE_TOPIC_BEGIN },
      { type: SAVE_TOPIC_SUCCESS, data: {} },
    ];

    return store.dispatch(saveTopic({ error: false }))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle saveTopic failure', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: SAVE_TOPIC_BEGIN },
      { type: SAVE_TOPIC_FAILURE, data: { error: 'some error' } },
    ];

    return store.dispatch(saveTopic({ error: true }))
      .catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle dismissSaveTopicError', () => {
    const expectedAction = {
      type: SAVE_TOPIC_DISMISS_ERROR,
    };
    expect(dismissSaveTopicError()).to.deep.equal(expectedAction);
  });

  it('reducer should handle SAVE_TOPIC_BEGIN', () => {
    const prevState = { saveTopicPending: true };
    const state = reducer(
      prevState,
      { type: SAVE_TOPIC_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveTopicPending).to.be.true;
  });

  it('reducer should handle SAVE_TOPIC_SUCCESS', () => {
    const prevState = { saveTopicPending: true };
    const state = reducer(
      prevState,
      { type: SAVE_TOPIC_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveTopicPending).to.be.false;
  });

  it('reducer should handle SAVE_TOPIC_FAILURE', () => {
    const prevState = { saveTopicPending: true };
    const state = reducer(
      prevState,
      { type: SAVE_TOPIC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveTopicPending).to.be.false;
    expect(state.saveTopicError).to.exist;
  });

  it('reducer should handle SAVE_TOPIC_DISMISS_ERROR', () => {
    const prevState = { saveTopicError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SAVE_TOPIC_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveTopicError).to.be.null;
  });
});
