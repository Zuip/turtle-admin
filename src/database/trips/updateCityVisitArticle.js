let db = require('../connection');

module.exports = function(visitId, articleId) {
  return db.none(
    `
      UPDATE city_visit
      SET article_id = $2
      WHERE city_visit.id = $1
    `,
    [
      visitId,
      articleId
    ]
  );
};