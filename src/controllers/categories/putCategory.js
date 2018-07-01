let categoryValidator = require('../../models/categories/categoryValidator');
let initializeCategoryFromReq = require('../../models/categories/initializeCategoryFromReq');
let updateCategory = require('../../database/categories/updateCategory');
let selectCategory = require('../../database/categories/selectCategory');

module.exports = function(req, res) {

  let language = req.query.language;

  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  let category = initializeCategoryFromReq(req);

  categoryValidator.validate(
    category,
    'put'
  ).then(() => {
    return selectCategory.withIdAndLanguage(
      category.id,
      language
    );
  }).then(function(categoryData) {
    category.languageId = categoryData.language_id;
  }).catch(function(error) {
    res.status(404).json({
      success: false,
      message: "The category does not exist!"
    });
  }).then(function(data) {

    if(categoryValidator.failedFields.length > 0) {
      return res.json({
        success: false,
        failedFields: categoryValidator.failedFields
      });
    }

    return updateCategory(category);

  }).then(() => {
    res.json({ success: true });
  }).catch(function(error) {
    console.log(error);
  });
};
