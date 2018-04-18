let db = require('../connection');

let selectCategories = {
  withParentIdAndLanguageCode: function(parentId, languageCode) {

    let parentIdCondition = "WHERE categories.parent_id IS NULL";
    let queryParameters = [languageCode];

    if(parentId !== null) {
      parentIdCondition = "WHERE categories.parent_id = $2";
      queryParameters.push(parentId);
    }

    return db.any(
      `
        SELECT categories.id as id,
               categories.menu_weight,
               translated_categories.name,
               translated_categories.urlname,
               translated_categories.description,
               translated_categories.published
        FROM categories
        JOIN translated_categories ON categories.id = translated_categories.category_id
        JOIN languages ON languages.id = translated_categories.language_id
        ${parentIdCondition}
        AND languages.code = $1
        AND categories.removed = false
        ORDER BY categories.menu_weight
      `,
      queryParameters
    );
  }
};

module.exports = selectCategories;
