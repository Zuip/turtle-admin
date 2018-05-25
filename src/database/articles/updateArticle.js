let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function(articleId, languageId, topic, urlName, summary, text, publishDate, published, writers) {
  return updateTranslatedArticle(articleId, languageId, topic, urlName, summary, text, published);
};

function updateArticleBase(articleId, publishDate) {
  return db.none(
    `
      UPDATE article SET timestamp = $2
      WHERE article.id = $1
    `,
    [articleId, publishDate]
  );
}

function updateTranslatedArticle(articleId, languageId, topic, urlName, summary, text, published) {
  return db.none(
    `
      UPDATE translated_article
      SET topic = $1,
          url_name = $2,
          summary = $3,
          text = $4,
          published = $5
      WHERE translated_article.article_id = $7
      AND translated_article.language_id = $6
    `,
    [topic, urlName, summary, text, published, languageId, articleId]
  );
}
