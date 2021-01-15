'use strict';

import Realm from 'realm';

class Article extends Realm.Object {}
Article.schema = {
  name: 'Article',
  properties: {
    title: 'string',
    description: 'string',
    publishedAt: 'string',
    urlToImage: 'string',
    content: 'string',
    url: 'string',
  },
};

export default new Realm({schema: [Article.schema]});
