let db = require('../connection');
let getDateAsUTC = require('../../models/getDateAsUTC');

module.exports = function(article) {
  return Promise.all([
    updateArticleBase(article),
    updateTranslatedArticle(article)
  ]);
};

function updateArticleBase(article) {

  let publishDateWithTime = getDateAsUTC(
    article.publish.date + ' ' + article.publish.time
  );

  return db.none(
    `
      UPDATE article SET timestamp = $2
      WHERE article.id = $1
    `,
    [article.id, publishDateWithTime]
  );
}

function updateTranslatedArticle(article) {
  return db.none(
    `
      UPDATE translated_article
      SET summary = $1,
          text = $2,
          published = $3
      WHERE translated_article.article_id = $5
      AND translated_article.language = $4
    `,
    [
      article.summary,
      article.text,
      article.published,
      article.language,
      article.id
    ]
  );
}
