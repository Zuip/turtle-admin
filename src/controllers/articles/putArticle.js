let articleValidator = require('../../models/articles/articleValidator');
let initializeArticleFromReq = require('../../models/articles/initializeArticleFromReq');
let updateArticle = require('../../database/articles/updateArticle');
let selectArticle = require('../../database/articles/selectArticle');

module.exports = function(req, res) {

  let language = req.query.language;

  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  let article = initializeArticleFromReq(req);

  articleValidator.validate(article, 'put').then(() => {
    return selectArticle.withVisitIdAndLanguage(
      article.visitId,
      language
    );
  }).then(articleData => {
    article.id = articleData.id;
    article.languageId = articleData.language_id;
  }).catch(() => {
    return res.status(404).json({
      success: false,
      message: "Article was not found"
    });
  }).then(() => {

    if(articleValidator.failedFields.length > 0) {
      return res.json({
        success: false,
        failedFields: articleValidator.failedFields
      });
    }

    return updateArticle(article);

  }).then(function() {
    res.json({ success: true });
  }).catch(function(error) {
    console.log(error);
  });
};
