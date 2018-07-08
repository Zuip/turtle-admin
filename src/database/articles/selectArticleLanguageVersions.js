let db = require('../connection');
let ArticleColumns = require('./ArticleColumns');

module.exports = {
  withArticleIds: function(articleIds) {
    return db.any(
      `
        SELECT article.id AS article_id,
               language.code,
               translated_article.published
        FROM article
        JOIN translated_article ON article.id = translated_article.article_id
        JOIN language ON language.id = translated_article.language_id
        WHERE article.id IN ($1:csv)
      `,
      [articleIds]
    );
  }
};
