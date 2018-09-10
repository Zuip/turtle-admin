let db = require('../connection');

module.exports = function(article) {
  return updateTranslatedArticle(article);
};

function updateTranslatedArticle(article) {
  return db.none(
    `
      UPDATE translated_article
      SET summary = $2,
          text = $3
      WHERE translated_article.article_id = $1
      AND translated_article.language = $4
    `,
    [
      article.id,
      article.summary,
      article.text,
      article.language
    ]
  );
}
