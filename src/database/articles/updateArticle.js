let db = require('../connection');
let deleteArticleUsers = require('./deleteArticleUsers');
let insertArticleUsers = require('./insertArticleUsers');
let selectLanguages = require('../selectLanguages');
let getDateAsUTC = require('../../models/getDateAsUTC');

module.exports = function(article) {
  return Promise.all([
    updateArticleBase(article),
    updateTranslatedArticle(article),
    updateWriters(article)
  ]);
};

function updateArticleBase(article) {

  let publishDateWithTime = getDateAsUTC(
    article.publish.date + ' ' + article.publish.time
  );

  return db.none(
    `
      UPDATE article SET city_id = $2, timestamp = $3
      WHERE article.id = $1
    `,
    [article.id, article.cityId, publishDateWithTime]
  );
}

function updateTranslatedArticle(article) {
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
    [
      article.topic,
      article.urlName,
      article.summary,
      article.text,
      article.published,
      article.languageId,
      article.id]
  );
}

function updateWriters(article) {
  deleteArticleUsers.withArticleId(article.id).then(() => {
    insertArticleUsers.withArticleIdAndUserIds(article.id, article.writers);
  });
}
