let db = require('../connection');
let deleteArticleUsers = require('./deleteArticleUsers');
let insertArticleUsers = require('./insertArticleUsers');
let selectLanguages = require('../selectLanguages');
let getDateAsUTC = require('../../models/getDateAsUTC');

module.exports = function(articleId, languageId, topic, urlName, summary, text, publishDate, published, writers) {

  return Promise.all([
    updateArticleBase(articleId, publishDate),
    updateTranslatedArticle(articleId, languageId, topic, urlName, summary, text, published),
    updateWriters(articleId, writers)
  ]);
};

function updateArticleBase(articleId, publishDate) {

  let publishDateWithTime = getDateAsUTC(publishDate);

  return db.none(
    `
      UPDATE article SET timestamp = $2
      WHERE article.id = $1
    `,
    [articleId, publishDateWithTime]
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

function updateWriters(articleId, writers) {
  deleteArticleUsers.withArticleId(articleId).then(() => {
    insertArticleUsers.withArticleIdAndUserIds(articleId, writers);
  });
}
