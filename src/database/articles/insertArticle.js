let db = require('../connection');
let selectLanguages = require('../selectLanguages');
let insertArticleUsers = require('./insertArticleUsers');
let getDateAsUTC = require('../../models/getDateAsUTC');

module.exports = function(article) {

  let articleId = insertArticleBase(article);
  let languages = selectLanguages.all();

  return Promise.all([articleId, languages]).then(function(data) {
    article.id = data[0].article_id;
    return data[1];
  }).then(languages => {
    return Promise.all([
      insertArticleUsers.withArticleIdAndUserIds(
        article.id,
        article.writers
      ),
      ...languages.map(function(language) {
        return insertTranslatedArticle(
          article,
          language.id
        );
      })
    ]);
  });
};

function insertArticleBase(article) {

  let publishDateWithTime = getDateAsUTC(
    article.publish.date + ' ' + article.publish.time
  );

  return db.one(
    `
      INSERT INTO article (
        category_id,
        city_id,
        timestamp
      ) VALUES (
        $1, $2, $3::timestamp
      )
      RETURNING id AS article_id
    `,
    [article.categoryId, article.cityId, publishDateWithTime]
  );
}

function insertTranslatedArticle(article, languageId) {
  db.none(
    `
      INSERT INTO translated_article (
        article_id,
        topic,
        url_name,
        summary,
        text,
        published,
        language_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )
    `,
    [
      article.id,
      article.topic,
      article.urlName,
      article.summary,
      article.text,
      article.published,
      languageId
    ]
  );
}
