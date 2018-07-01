let db = require('../connection');
let selectLanguages = require('../selectLanguages');
let insertArticleUsers = require('./insertArticleUsers');
let getDateAsUTC = require('../../models/getDateAsUTC');

module.exports = function(article) {

  let articleId = insertArticleBase(article);
  let languages = selectLanguages.all();

  Promise.all([articleId, languages]).then(function(data) {

    let firstAdded = false;

    data[1].map(function(language) {

      let languageEnding = '';
      if(firstAdded) {
        languageEnding = '-' + language.code;
      }

      firstAdded = true;

      insertTranslatedArticle(
        data[0].article_id,
        language.id,
        article
      );
    });

    insertArticleUsers.withArticleIdAndUserIds(data[0].article_id, writers);

  }).catch(function(error) {
    console.log(error);
  });
};

function insertArticleBase(article) {

  let publishDateWithTime = getDateAsUTC(
    article.publish.date + ' ' + article.publish.time
  );

  return db.one(
    `
      INSERT INTO article (category_id, city_id, timestamp) VALUES ($1, $2, $3::timestamp)
      RETURNING id AS article_id
    `,
    [article.categoryId, article.cityId, publishDateWithTime]
  );
}

function insertTranslatedArticle(articleId, languageId, article) {
  db.none(
    `
      INSERT INTO translated_article (
        topic, url_name, summary, text, published, language_id, article_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [
      article.topic,
      article.urlName,
      article.summary,
      article.text,
      article.published,
      languageId,
      articleId
    ]
  );
}
