let db = require('../connection');

let selectColumns = `
  categories.id AS id,
  categories.parent_id AS parent_id,
  categories.menu_weight AS menu_weight,
  translated_categories.name AS name,
  translated_categories.urlname AS urlname,
  translated_categories.description AS description,
  translated_categories.published AS published
`;

let selectCategory = {
  withId: function(categoryId) {
    return db.one(
      `
        SELECT *
        FROM categories
        WHERE categories.id = $1
        AND removed = false
      `,
      [categoryId]
    );
  },
  withIdAndLanguage: function(categoryId, language) {
    return db.one(
      `
        SELECT ${selectColumns}
        FROM categories
        JOIN translated_categories ON translated_categories.category_id = categories.id
        JOIN languages ON translated_categories.language_id = languages.id
        WHERE categories.id = $1
        AND languages.code = $2
        AND removed = false
      `,
      [categoryId, language]
    );
  },
  withUrlName: function(urlName) {
    return db.any(
      `
        SELECT ${selectColumns}
        FROM categories
        JOIN translated_categories ON translated_categories.category_id = categories.id
        WHERE translated_categories.urlname = $1
      `,
      [urlName]
    );
  }
};

module.exports = selectCategory;
