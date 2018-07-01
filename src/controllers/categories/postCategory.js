let categoryValidator = require('../../models/categories/categoryValidator');
let initializeCategoryFromReq = require('../../models/categories/initializeCategoryFromReq');
let insertCategory = require('../../database/categories/insertCategory');

module.exports = function(req, res) {

  let category = initializeCategoryFromReq(req);

  categoryValidator.validate(
    category,
    'post'
  ).then(() => {

    if(categoryValidator.failedFields.length > 0) {
      return res.json({
        success: false,
        failedFields: categoryValidator.failedFields
      });
    }

    return insertCategory(category);
  }).then(() => {
    res.json({ success: true });
  }).catch(error => {
    console.log(error);
  });
};
