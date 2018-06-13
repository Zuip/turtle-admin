let db = require('../connection');

module.exports = {
  withArticleId(articleId) {
    return db.none(
      'DELETE FROM article_user WHERE article_id = $1',
      [ articleId ]
    );
  }
}
