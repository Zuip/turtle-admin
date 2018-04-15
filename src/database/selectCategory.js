let db = require('./connection');

let selectCategory = {
  withId: function(categoryId) {
    return db.one(
      `
        SELECT *
        FROM translated_categories
        WHERE id = $1
      `,
      [categoryId]
    );
  },
  withUrlName: function(urlName) {
    return db.any(
      `
        SELECT *
        FROM translated_categories
        WHERE urlname = $1
      `,
      [urlName]
    );
  }
};

module.exports = selectCategory;
