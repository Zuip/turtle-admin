let db = require('../connection');
let ArticleColumns = require('./ArticleColumns');

module.exports = {
  withIdAndLanguage: function(articleId, language) {
    return db.one(
      `
        SELECT ${ArticleColumns.getSelectQuery()}
        FROM article
        JOIN translated_article ON translated_article.article_id = article.id
        JOIN language ON language.id = translated_article.language_id
        WHERE article.id = $1
        AND language.code = $2
      `,
      [articleId, language]
    );
  },
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
