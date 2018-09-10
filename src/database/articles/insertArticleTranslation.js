let db = require('../connection');

module.exports = function(article) {
  return db.none(
    `
      INSERT INTO translated_article (
        article_id,
        summary,
        text,
        language
      ) VALUES (
        $1, $2, $3, $4
      )
    `,
    [
      article.id,
      article.summary,
      article.text,
      article.language
    ]
  );
};
