let categoryValidator = require('../models/categories/categoryValidator');
let insertCategory = require('../database/insertCategory');
let selectCategory = require('../database/selectCategory');

let postCategory = function(req, res) {

  categoryValidator.initialize();
  categoryValidator.setName(req.body.name);
  categoryValidator.setUrlName(req.body.urlName);
  categoryValidator.setPublished(req.body.published);
  categoryValidator.initializeFailedFields();

  selectCategory.withUrlName(
    req.body.urlName
  ).then(function(data) {

    if(data.length > 0) {
      categoryValidator.addFailedField("urlName");
    }

    if(req.body.parent === null) {
      return;
    }

    return selectCategory.withId(req.body.parent);

  }).then(function(data) {
    // A category id with selected parent id was found or parent id is null
  }).catch(function(error) {
    categoryValidator.addFailedField("parent");
  }).then(function(data) {

    if(categoryValidator.getFailedFields().length > 0) {
      return res.json({
        success: false,
        failedFields: categoryValidator.getFailedFields()
      });
    }

    insertCategory(
      req.body.parent,
      req.body.name,
      req.body.urlName,
      req.body.description,
      categoryValidator.getPublishedAsBoolean()
    );

    res.json({ success: true });
  }).catch(function(error) {
    console.log(error);
  });
};

module.exports = postCategory;
