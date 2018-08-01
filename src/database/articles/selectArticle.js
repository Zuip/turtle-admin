let ArticleColumns = require('./ArticleColumns');
let db = require('../connection');

function handleTimezone(date) {

  let dateWithoutTimezone = new Date(
    Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(),
      date.getHours(), date.getMinutes()
    )
  );

  return new Date(dateWithoutTimezone.getTime());
}

function formatDate(date) {
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
}

function formatTime(date) {
  return date.getHours() + ':' + date.getMinutes();
}

let formatDateAndTime = function(article) {
  let datetimeWithTimezone = handleTimezone(new Date(article.timestamp));
  article.date = formatDate(datetimeWithTimezone);
  article.time = formatTime(datetimeWithTimezone);
  delete article.timestamp;
  return article;
};

module.exports = {
  withIdAndLanguage: function(articleId, language) {
    return db.one(
      `
        SELECT ${ArticleColumns.getSelectQuery()}
        FROM article
        JOIN translated_article ON translated_article.article_id = article.id
        JOIN language ON language.id = translated_article.language_id
        WHERE article.id = $1
        AND language.code = $2
      `,
      [articleId, language]
    ).then(
      formatDateAndTime
    );
  },
  withVisitIdAndLanguage: function(visitId, language) {
    return db.one(
      `
        SELECT ${ArticleColumns.getSelectQuery()}
        FROM city_visit
        JOIN article ON article.id = city_visit.article_id
        JOIN translated_article ON translated_article.article_id = article.id
        JOIN language ON language.id = translated_article.language_id
        WHERE city_visit.id = $1
        AND language.code = $2
      `,
      [visitId, language]
    ).then(
      formatDateAndTime
    );
  },
  withUrlName: function(urlName) {
    return db.one(
      `
        SELECT ${ArticleColumns.getSelectQuery()}
        FROM article
        JOIN translated_article ON translated_article.article_id = article.id
        WHERE translated_article.url_name = $1
      `,
      [urlName]
    ).then(
      formatDateAndTime
    );
  }
};
