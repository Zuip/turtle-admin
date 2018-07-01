let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function(category) {
  Promise.all([
    insertCategoryBase(category.parentId),
    selectLanguages.all()
  ]).then(function(data) {
    category.id = data[0].category_id;
    return data[1];
  }).then(languages => {
    return Promise.all(
      languages.map(function(language) {
        insertTranslatedCategory(category, language.id);
      })
    );
  }).catch(function(error) {
    console.log(error);
  });
};

function insertCategoryBase(parentId) {
  return db.one(
    `
      INSERT INTO category (parent_id, menu_weight)
      SELECT $1, MAX(menu_weight) + 1
      FROM (
        SELECT menu_weight
        FROM category
        UNION
        SELECT 0 as menu_weight
      ) menu_weights
      RETURNING id AS category_id
    `,
    [parentId]
  );
}

function insertTranslatedCategory(category, languageId) {
  db.none(
    `
      INSERT INTO translated_category (
        category_id, name, url_name, description, published, language_id
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      category.id,
      category.name,
      category.urlName,
      category.description,
      category.published,
      languageId
    ]
  );
}
