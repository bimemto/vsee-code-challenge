import * as types from './types';

export function getNews(response) {
  return {
    type: types.GET_NEWS,
    response: response,
  };
}

export function getNewsError(error) {
  return {
    type: types.GET_NEWS_ERROR,
    error: error,
  };
}
