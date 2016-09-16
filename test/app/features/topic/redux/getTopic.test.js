import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  GET_TOPIC_BEGIN,
  GET_TOPIC_SUCCESS,
  GET_TOPIC_FAILURE,
  GET_TOPIC_DISMISS_ERROR,
} from 'features/topic/redux/constants';

import {
  getTopic,
  dismissGetTopicError,
  reducer,
} from 'features/topic/redux/getTopic';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topic/redux/getTopic', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('action should handle getTopic success', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: GET_TOPIC_BEGIN },
      { type: GET_TOPIC_SUCCESS, data: {} },
    ];

    return store.dispatch(getTopic({ error: false }))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle getTopic failure', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: GET_TOPIC_BEGIN },
      { type: GET_TOPIC_FAILURE, data: { error: 'some error' } },
    ];

    return store.dispatch(getTopic({ error: true }))
      .catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle dismissGetTopicError', () => {
    const expectedAction = {
      type: GET_TOPIC_DISMISS_ERROR,
    };
    expect(dismissGetTopicError()).to.deep.equal(expectedAction);
  });

  it('reducer should handle GET_TOPIC_BEGIN', () => {
    const prevState = { getTopicPending: true };
    const state = reducer(
      prevState,
      { type: GET_TOPIC_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTopicPending).to.be.true;
  });

  it('reducer should handle GET_TOPIC_SUCCESS', () => {
    const prevState = { getTopicPending: true };
    const state = reducer(
      prevState,
      { type: GET_TOPIC_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTopicPending).to.be.false;
  });

  it('reducer should handle GET_TOPIC_FAILURE', () => {
    const prevState = { getTopicPending: true };
    const state = reducer(
      prevState,
      { type: GET_TOPIC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTopicPending).to.be.false;
    expect(state.getTopicError).to.exist;
  });

  it('reducer should handle GET_TOPIC_DISMISS_ERROR', () => {
    const prevState = { getTopicError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GET_TOPIC_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTopicError).to.be.null;
  });
});
