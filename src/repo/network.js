import axios from 'axios';

export const getNews = (callback) => {
  axios
    .get(
      'http://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=6ae43f8b088046daaf7b105da44e33c3',
    )
    .then((res) => res.data)
    .then((response) => {
      if (response.status === 'ok') {
        callback(response.articles, null);
      } else {
        callback(null, new Error(JSON.stringify(response)));
      }
    })
    .catch((error) => {
      callback(null, error);
    });
};
