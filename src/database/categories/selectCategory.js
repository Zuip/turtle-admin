let db = require('../connection');

let selectColumns = `
  category.id AS id,
  category.parent_id AS parent_id,
  category.menu_weight AS menu_weight,
  translated_category.name AS name,
  translated_category.url_name AS url_name,
  translated_category.description AS description,
  translated_category.published AS published
`;

module.exports = {
  withId: function(categoryId) {
    return db.one(
      `
        SELECT *
        FROM category
        WHERE category.id = $1
        AND removed = false
      `,
      [categoryId]
    );
  },
  withIdAndLanguage: function(categoryId, language) {
    return db.one(
      `
        SELECT ${selectColumns}
        FROM category
        JOIN translated_category ON translated_category.category_id = category.id
        JOIN language ON translated_category.language_id = language.id
        WHERE category.id = $1
        AND language.code = $2
        AND removed = false
      `,
      [categoryId, language]
    );
  },
  withUrlName: function(urlName) {
    return db.one(
      `
        SELECT ${selectColumns}
        FROM category
        JOIN translated_category ON translated_category.category_id = category.id
        WHERE translated_category.url_name = $1
      `,
      [urlName]
    );
  }
};
