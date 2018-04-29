let db = require('../connection');
let ArticleColumns = require('./ArticleColumns');

module.exports = {
  withCategoryIdAndLanguageCode: function(categoryId, languageCode) {
    return db.any(
      `
        SELECT ${ArticleColumns.getSelectQuery()}
        FROM article
        JOIN translated_article ON article.id = translated_article.article_id
        JOIN language ON language.id = translated_article.language_id
        WHERE article.category_id = $1
        AND language.code = $2
        ORDER BY article.timestamp
      `,
      [categoryId, languageCode]
    );
  }
};
