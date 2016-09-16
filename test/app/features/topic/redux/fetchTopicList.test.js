import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  FETCH_TOPIC_LIST_BEGIN,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAILURE,
  FETCH_TOPIC_LIST_DISMISS_ERROR,
} from 'features/topic/redux/constants';

import {
  fetchTopicList,
  dismissFetchTopicListError,
  reducer,
} from 'features/topic/redux/fetchTopicList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topic/redux/fetchTopicList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('action should handle fetchTopicList success', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: FETCH_TOPIC_LIST_BEGIN },
      { type: FETCH_TOPIC_LIST_SUCCESS, data: {} },
    ];

    return store.dispatch(fetchTopicList({ error: false }))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle fetchTopicList failure', () => {
    const store = mockStore({});

    const expectedActions = [
      { type: FETCH_TOPIC_LIST_BEGIN },
      { type: FETCH_TOPIC_LIST_FAILURE, data: { error: 'some error' } },
    ];

    return store.dispatch(fetchTopicList({ error: true }))
      .catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('action should handle dismissFetchTopicListError', () => {
    const expectedAction = {
      type: FETCH_TOPIC_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchTopicListError()).to.deep.equal(expectedAction);
  });

  it('reducer should handle FETCH_TOPIC_LIST_BEGIN', () => {
    const prevState = { fetchTopicListPending: true };
    const state = reducer(
      prevState,
      { type: FETCH_TOPIC_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchTopicListPending).to.be.true;
  });

  it('reducer should handle FETCH_TOPIC_LIST_SUCCESS', () => {
    const prevState = { fetchTopicListPending: true };
    const state = reducer(
      prevState,
      { type: FETCH_TOPIC_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchTopicListPending).to.be.false;
  });

  it('reducer should handle FETCH_TOPIC_LIST_FAILURE', () => {
    const prevState = { fetchTopicListPending: true };
    const state = reducer(
      prevState,
      { type: FETCH_TOPIC_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchTopicListPending).to.be.false;
    expect(state.fetchTopicListError).to.exist;
  });

  it('reducer should handle FETCH_TOPIC_LIST_DISMISS_ERROR', () => {
    const prevState = { fetchTopicListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: FETCH_TOPIC_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchTopicListError).to.be.null;
  });
});
