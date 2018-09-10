let db = require('../connection');
let insertArticleTranslation = require('./insertArticleTranslation');

module.exports = function(article) {

  return insertArticleBase().then(articleId => {
    
    article.id = articleId;

    return insertArticleTranslation(
      article
    ).then(
      () => articleId
    );
  });
};

function insertArticleBase() {
  return db.one(
    `
      INSERT INTO article DEFAULT VALUES
      RETURNING id AS id
    `
  ).then(
    data => data.id
  );
}
