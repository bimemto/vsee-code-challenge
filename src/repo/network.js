import axios from 'axios';

export const getNews = (page, callback) => {
  const url =
    'https://newsapi.org/v2/everything?q=sport&apiKey=6ae43f8b088046daaf7b105da44e33c3&page=' +
    page;
  axios
    .get(url)
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
