let db = require('../connection');

let selectFields = `
  article.id AS article_id,
  translated_article.language AS article_language,
  translated_article.published AS article_published
`;

module.exports = {
  withArticleId: function(articleId) {
    return db.any(
      `
        SELECT ` + selectFields + `
        FROM article
        JOIN translated_article ON article.id = translated_article.article_id
        WHERE article.id = $1
      `,
      [articleId]
    );
  },
  withArticleIds: function(articleIds) {
    return db.any(
      `
        SELECT ` + selectFields + `
        FROM article
        JOIN translated_article ON article.id = translated_article.article_id
        WHERE article.id IN ($1:csv)
      `,
      [articleIds]
    );
  },
  withVisitId: function(visitId) {
    return db.any(
      `
        SELECT ` + selectFields + `
        FROM city_visit
        JOIN article ON city_visit.article_id = article.id
        JOIN translated_article ON article.id = translated_article.article_id
        WHERE city_visit.id = $1
      `,
      [visitId]
    );
  },
};
