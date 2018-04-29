let db = require('../connection');
let ArticleColumns = require('./ArticleColumns');

module.exports = {
  withUrlName: function(urlName) {
    return db.one(
      `
        SELECT ${ArticleColumns.getSelectQuery()}
        FROM article
        JOIN translated_article ON translated_article.article_id = article.id
        WHERE translated_article.url_name = $1
      `,
      [urlName]
    );
  }
};
