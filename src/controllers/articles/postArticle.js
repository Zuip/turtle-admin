let articleValidator = require('../../models/articles/articleValidator');
let insertArticle = require('../../database/articles/insertArticle');
let selectArticle = require('../../database/articles/selectArticle');
let selectCategory = require('../../database/categories/selectCategory');

module.exports = function(req, res) {

  articleValidator.initialize();
  articleValidator.setTopic(req.body.topic);
  articleValidator.setUrlName(req.body.urlName);
  articleValidator.setText(req.body.text);
  articleValidator.setPublished(req.body.published);
  articleValidator.initializeFailedFields();

  selectArticle.withUrlName(
    req.body.urlName
  ).then(function(data) {
    articleValidator.addFailedField("urlName");
  }).catch(function() {
    // The article with same url name was not found, so we ended up in here
  }).then(function() {

    if(req.body.categoryId === null) {
      return;
    }

    return selectCategory.withId(req.body.categoryId);

  }).then(function(data) {
    // A category id was found or category id is null
  }).catch(function(error) {
    articleValidator.addFailedField("categoryId");
  }).then(function(data) {

    if(articleValidator.getFailedFields().length > 0) {
      return res.json({
        success: false,
        failedFields: articleValidator.getFailedFields()
      });
    }

    insertArticle(
      req.body.categoryId,
      req.body.topic,
      req.body.urlName,
      req.body.summary,
      req.body.text,
      req.body.publish.date + ' ' + req.body.publish.time,
      articleValidator.getPublishedAsBoolean(),
      req.body.writers
    );

    res.json({ success: true });

  }).catch(function(error) {
    console.log(error);
  });
};
