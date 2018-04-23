let db = require('../connection');

module.exports = {
  withId: function(categoryId) {
    return db.none(
      `
        UPDATE category
        SET removed = true
        WHERE id = $1
      `,
      [categoryId]
    );
  }
};
