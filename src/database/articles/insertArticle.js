let db = require('../connection');
let selectLanguages = require('../selectLanguages');
let getDateAsUTC = require('../../models/getDateAsUTC');

module.exports = function(categoryId, topic, urlName, summary, text, publishDate, published, writers) {

  let articleId = insertArticleBase(categoryId, publishDate);
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
        topic,
        urlName + languageEnding,
        summary,
        text,
        published,
        language.id,
        data[0].article_id
      );
    });
  }).catch(function(error) {
    console.log(error);
  });
};

function insertArticleBase(categoryId, publishDate) {

  let publishDateWithTime = getDateAsUTC(publishDate);

  return db.one(
    `
      INSERT INTO article (category_id, timestamp) VALUES ($1, $2::timestamp)
      RETURNING id AS article_id
    `,
    [categoryId, publishDateWithTime]
  );
}

function insertTranslatedArticle(topic, urlName, summary, text, published, languageId, articleId) {
  db.none(
    `
      INSERT INTO translated_article (
        topic, url_name, summary, text, published, language_id, article_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [topic, urlName, summary, text, published, languageId, articleId]
  );
}
