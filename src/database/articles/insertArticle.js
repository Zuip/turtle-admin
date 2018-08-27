let db = require('../connection');
let getDateAsUTC = require('../../models/getDateAsUTC');

module.exports = function(article, language) {
  return insertArticleBase(
    article
  ).then(articleId => {
    
    article.id = articleId;

    return insertTranslatedArticle(
      article,
      language
    ).then(
      () => articleId
    );
  });
};

function insertArticleBase(article) {

  let publishDateWithTime = getDateAsUTC(
    article.publish.date + ' ' + article.publish.time
  );

  return db.one(
    `
      INSERT INTO article (
        created
      ) VALUES (
        $1::timestamp
      )
      RETURNING id AS id
    `,
    [publishDateWithTime]
  ).then(
    data => data.id
  );
}

function insertTranslatedArticle(article, language) {
  return db.none(
    `
      INSERT INTO translated_article (
        article_id,
        summary,
        text,
        published,
        language
      ) VALUES (
        $1, $2, $3, $4, $5
      )
    `,
    [
      article.id,
      article.summary,
      article.text,
      article.published,
      language
    ]
  );
}
