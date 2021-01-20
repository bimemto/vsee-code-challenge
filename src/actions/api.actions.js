import * as types from './types';

//redux action ti dispatch when get news success
export function getNews(response) {
  return {
    type: types.GET_NEWS,
    response: response,
  };
}

//redux action ti dispatch when get news error
export function getNewsError(error) {
  return {
    type: types.GET_NEWS_ERROR,
    error: error,
  };
}
