let deleteCategory = require('../../database/categories/deleteCategory');
let selectCategory = require('../../database/categories/selectCategory');

module.exports = function(req, res) {
  selectCategory.withId(req.params.categoryId).then(function() {
    return deleteCategory.withId(req.params.categoryId);
  }).catch(function(error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "The category does not exist!"
    });
  }).then(function(data) {
    res.json({
      success: true
    });
  }).catch(function(error) {
    console.log(error);
  });
};
