import createReducer from './createReducers';
import * as types from '../actions/types';

export const getNewsReducer = createReducer([], {
  [types.GET_NEWS](state, action) {
    return {
      ...state,
      news: action.response,
    };
  },
  [types.GET_NEWS_ERROR](state, action) {
    return {
      ...state,
      newsError: action.error,
    };
  },
});
