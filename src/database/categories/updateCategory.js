let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function (categoryId, languageId, name, urlName, description, published) {
  db.none(
    `
      UPDATE translated_category
      SET name = $3,
          url_name = $4,
          description = $5,
          published = $6
      WHERE category_id = $1
      AND language_id = $2
    `,
    [categoryId, languageId, name, urlName, description, published]
  );
};
