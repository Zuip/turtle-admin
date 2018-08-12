let db = require('../connection');

module.exports = {
  withArticleId: function(articleId) {
    return db.any(
      `
        SELECT translated_article.language AS article_language
        FROM article
        JOIN translated_article ON article.id = translated_article.article_id
        WHERE article.id = $1
      `,
      [articleId]
    );
  },
  withArticleIds: function(articleIds) {
    return db.any(
      `
        SELECT article.id AS article_id,
               translated_article.language AS article_language,
               translated_article.published AS article_is_published
        FROM article
        JOIN translated_article ON article.id = translated_article.article_id
        WHERE article.id IN ($1:csv)
      `,
      [articleIds]
    );
  }
};
