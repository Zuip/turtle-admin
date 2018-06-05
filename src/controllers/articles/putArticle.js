let articleValidator = require('../../models/articles/articleValidator');
let updateArticle = require('../../database/articles/updateArticle');
let selectArticle = require('../../database/articles/selectArticle');

module.exports = function(req, res) {

  let articleId = req.params.articleId;
  let language = req.query.language;

  articleValidator.initialize();
  articleValidator.setTopic(req.body.topic);
  articleValidator.setUrlName(req.body.urlName);
  articleValidator.setText(req.body.text);
  articleValidator.setPublished(req.body.published);
  articleValidator.initializeFailedFields();

  selectArticle.withIdAndLanguage(articleId, language).then(function(articleData) {

    selectArticle.withUrlName(req.body.urlName).then(function(data) {
      if(data.id !== parseInt(articleId)) {
        articleValidator.addFailedField("urlName");
      }
    }).catch(function(error) {
      // The article with same url name was not found, so we can continue
      // editing the article
    }).then(function(data) {

      if(articleValidator.getFailedFields().length > 0) {
        return res.json({
          success: false,
          failedFields: articleValidator.getFailedFields()
        });
      }

      return updateArticle(
        articleId,
        articleData.language_id,
        req.body.topic,
        req.body.urlName,
        req.body.summary,
        req.body.text,
        req.body.publishDate,
        articleValidator.getPublishedAsBoolean(),
        req.body.writers
      ).then(function() {
        res.json({ success: true });
      });

    }).catch(function(error) {
      console.log(error);
    });

  }).catch(function() {
    return res.status(404).json({
      success: false,
      message: "Article was not found"
    });
  })
};
