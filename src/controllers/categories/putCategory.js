let categoryValidator = require('../../models/categories/categoryValidator');
let updateCategory = require('../../database/categories/updateCategory');
let selectCategory = require('../../database/categories/selectCategory');
let selectLanguage = require('../../database/selectLanguage');

module.exports = function(req, res) {

  let categoryId = req.params.categoryId;
  let language = req.query.language;

  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  categoryValidator.initialize();
  categoryValidator.setName(req.body.name);
  categoryValidator.setUrlName(req.body.urlName);
  categoryValidator.setPublished(req.body.published);
  categoryValidator.initializeFailedFields();

  selectCategory.withUrlName(
    req.body.urlName
  ).then(function(data) {
    if(data.id !== parseInt(categoryId)) {
      categoryValidator.addFailedField("urlName");
    }
  }).catch(function() {
    // The category with same url name was not found, so we ended up in here
  }).then(function() {
    return selectCategory.withIdAndLanguage(categoryId, language);
  }).then(function(data) {
    // A category id with selected parent id was found or parent id is null
  }).catch(function(error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "The category does not exist!"
    });
  }).then(function(data) {

    if(categoryValidator.getFailedFields().length > 0) {
      return res.json({
        success: false,
        failedFields: categoryValidator.getFailedFields()
      });
    }

    selectLanguage.withCode(language).then(function(languageData) {

      updateCategory(
        categoryId,
        languageData.id,
        req.body.name,
        req.body.urlName,
        req.body.description,
        categoryValidator.getPublishedAsBoolean()
      );

      res.json({ success: true });
    }).catch(error => {
      console.log(error);
    });

  }).catch(function(error) {
    console.log(error);
  });
};
