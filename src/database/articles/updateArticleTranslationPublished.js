let db = require('../connection');

module.exports = function(articleId, language) {
  return db.none(
    `
      UPDATE translated_article
      SET published = current_timestamp
      WHERE translated_article.article_id = $1
      AND translated_article.language = $2
    `,
    [
      articleId,
      language
    ]
  );
};
