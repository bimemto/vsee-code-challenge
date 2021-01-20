import createReducer from './createReducers';
import * as types from '../actions/types';

export const getNewsReducer = createReducer([], {
  // Check to see if the reducer cares about this action
  [types.GET_NEWS](state, action) {
    // If so, update the state with the new value
    return {
      ...state,
      news: action.response,
    };
  },
  [types.GET_NEWS_ERROR](state, action) {
    return {
      ...state,
      error: action.error,
    };
  },
});
