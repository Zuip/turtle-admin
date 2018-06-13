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

function addArticleUsersToArticle(article) {
  return db.any(
    `
      SELECT article_user.user_id
      FROM article_user
      WHERE article_user.article_id = $1
    `,
    [ article.id ]
  ).then(articleUsers => {
    article.users = articleUsers.map(articleUser => articleUser.user_id);
    return article;
  });
}

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
    ).then(
      addArticleUsersToArticle
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
    ).then(
      addArticleUsersToArticle
    );
  }
};
