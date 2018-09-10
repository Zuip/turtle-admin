let articleValidator = require('../../models/articles/articleValidator');
let initializeArticleFromReq = require('../../models/articles/initializeArticleFromReq');
let insertArticleTranslation = require('../../database/articles/insertArticleTranslation');
let selectArticle = require('../../database/articles/selectArticle');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);
  let article = initializeArticleFromReq(req);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(
    () => articleValidator.validate(article, 'post').then(
      () => selectArticle.withVisitId(article.visitId)
    ).then(visitArticle => {

      article.id = visitArticle.article_id;

      if(articleValidator.failedFields.length === 0) {
        return insertArticleTranslation(article);
      }

      return sendFailure(400, {
        failedFields: articleValidator.failedFields
      });
    })
  ).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};
