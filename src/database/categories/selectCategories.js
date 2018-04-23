let db = require('../connection');

module.exports = {
  withParentIdAndLanguageCode: function(parentId, languageCode) {

    let parentIdCondition = "WHERE category.parent_id IS NULL";
    let queryParameters = [languageCode];

    if(parentId !== null) {
      parentIdCondition = "WHERE category.parent_id = $2";
      queryParameters.push(parentId);
    }

    return db.any(
      `
        SELECT category.id as id,
               category.menu_weight,
               translated_category.name,
               translated_category.url_name,
               translated_category.description,
               translated_category.published
        FROM category
        JOIN translated_category ON category.id = translated_category.category_id
        JOIN language ON language.id = translated_category.language_id
        ${parentIdCondition}
        AND language.code = $1
        AND category.removed = false
        ORDER BY category.menu_weight
      `,
      queryParameters
    );
  }
};
