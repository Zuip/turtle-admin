let articleValidator = require('../../models/articles/articleValidator');
let initializeArticleFromReq = require('../../models/articles/initializeArticleFromReq');
let insertArticle = require('../../database/articles/insertArticle');
let updateCityVisitArticle = require('../../database/trips/updateCityVisitArticle');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  let article = initializeArticleFromReq(req);

  articleValidator.validate(article, 'post').then(() => {

    if(articleValidator.failedFields.length > 0) {
      return res.json({
        success: false,
        failedFields: articleValidator.failedFields
      });
    }

    return insertArticle(article, language);

  }).then(articleId => {
    return updateCityVisitArticle(article.visitId, articleId);
  }).then(() => {
    res.json({ success: true });
  }).catch(function(error) {
    console.log(error);
  });
};
