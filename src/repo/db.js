export const getLocalNews = (realm) => {
  const localArticles = realm.objects('Article');
  var articles = [];
  Object.keys(localArticles).forEach(function (key) {
    var value = localArticles[key];
    articles.push({
      title: value.title,
      description: value.description,
      publishedAt: value.publishedAt,
      urlToImage: value.urlToImage,
      content: value.content,
      url: value.url,
    });
  });
  return articles;
};

export const storeNews = (realm, articles) => {
  realm.write(() => {
    const allArticles = realm.objects('Article');
    realm.delete(allArticles);
    articles.forEach((article) => {
      realm.create('Article', article);
    });
  });
};
