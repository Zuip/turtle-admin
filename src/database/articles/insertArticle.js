let db = require('../connection');
let selectLanguage = require('../selectLanguage');
let getDateAsUTC = require('../../models/getDateAsUTC');

module.exports = function(article, languageCode) {
  return Promise.all([
    insertArticleBase(article),
    selectLanguage.withCode(languageCode)
  ]).then(function(data) {
    article.id = data[0].article_id;
    return data[1];
  }).then(language => {
    return Promise.all([
      insertTranslatedArticle(
        article,
        language.id
      )
    ]).then(() => {
      return article.id;
    });
  });
};

function insertArticleBase(article) {

  let publishDateWithTime = getDateAsUTC(
    article.publish.date + ' ' + article.publish.time
  );

  return db.one(
    `
      INSERT INTO article (
        timestamp
      ) VALUES (
        $1::timestamp
      )
      RETURNING id AS article_id
    `,
    [publishDateWithTime]
  );
}

function insertTranslatedArticle(article, languageId) {
  db.none(
    `
      INSERT INTO translated_article (
        article_id,
        summary,
        text,
        published,
        language_id
      ) VALUES (
        $1, $2, $3, $4, $5
      )
    `,
    [
      article.id,
      article.summary,
      article.text,
      article.published,
      languageId
    ]
  );
}
