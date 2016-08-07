import {
  CATEGORY_TEST_ACTION,
} from './constants';

const initialState = {
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_TEST_ACTION:
      return {
        ...state,
      };

    default:
      return state;
  }
}

