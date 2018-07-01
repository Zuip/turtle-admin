let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function(category) {
  return db.none(
    `
      UPDATE translated_category
      SET name = $3,
          url_name = $4,
          description = $5,
          published = $6
      WHERE category_id = $1
      AND language_id = $2
    `,
    [
      category.id,
      category.languageId,
      category.name,
      category.urlName,
      category.description,
      category.published
    ]
  );
};
