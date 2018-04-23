let selectCategory = require('../database/categories/selectCategory');

module.exports = function(req, res) {

  let categoryId = req.params.categoryId;
  let language = req.query.language;

  selectCategory.withIdAndLanguage(categoryId, language).then(function(data) {
    res.json({
      id: data.id,
      parentId: data.parent_id,
      menuWeight: data.menu_weight,
      name: data.name,
      urlName: data.url_name,
      description: data.description,
      published: data.published
    });
  }).catch(function(error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "The category does not exist!"
    });
  });
};
