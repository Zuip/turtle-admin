let db = require('../connection');
let selectLanguages = require('../selectLanguages');

let insertCategory = function (parentId, name, urlName, description, published) {

  let categoryId = insertCategoryBase();
  let languages = selectLanguages.all();

  Promise.all([categoryId, languages]).then(function(data) {
    data[1].map(function(language) {
      insertTranslatedCategory(
        name,
        urlName,
        description,
        published,
        language.id,
        data[0].category_id
      );
    });
  }).catch(function(error) {
    console.log(error);
  });
};

function insertCategoryBase(parentId) {
  return db.one(
    `
      INSERT INTO categories (parent_id, menu_weight)
      SELECT $1, MAX(menu_weight)
      FROM (
        SELECT menu_weight
        FROM categories
        UNION
        SELECT 0 as menu_weight
      ) menu_weights
      RETURNING id AS category_id
    `,
    [parentId]
  );
}

function insertTranslatedCategory(name, urlName, description, published, languageId, categoryId) {
  db.none(
    `
      INSERT INTO translated_categories (
        name, urlname, description, published, language_id, category_id
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [name, urlName, description, published, languageId, categoryId]
  );
}

module.exports = insertCategory;
