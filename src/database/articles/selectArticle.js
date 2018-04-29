let db = require('../connection');

let selectColumns = `
  article.id AS id,
  article.category_id AS category_id,
  translated_article.topic AS topic,
  translated_article.url_name AS url_name,
  translated_article.summary AS summary,
  translated_article.text AS text,
  article.timestamp AS timestamp,
  translated_article.published AS published,
  translated_article.language_id AS language_id
`;

module.exports = {
  withUrlName: function(urlName) {
    return db.one(
      `
        SELECT ${selectColumns}
        FROM article
        JOIN translated_article ON translated_article.article_id = article.id
        WHERE translated_article.url_name = $1
      `,
      [urlName]
    );
  }
};
