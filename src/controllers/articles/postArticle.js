let articleValidator = require('../../models/articles/articleValidator');
let initializeArticleFromReq = require('../../models/articles/initializeArticleFromReq');
let insertArticle = require('../../database/articles/insertArticle');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let updateCityVisitArticle = require('../../database/trips/updateCityVisitArticle');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);
  let article = initializeArticleFromReq(req);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(() => {

    return articleValidator.validate(article, 'post').then(() => {

      if(articleValidator.failedFields.length === 0) {
        return insertArticle(article, req.query.language);
      }

      return sendFailure(400, {
        failedFields: articleValidator.failedFields
      });
    });

  }).then(articleId => {
    return updateCityVisitArticle(article.visitId, articleId);
  }).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};
