let articleValidator = require('../../models/articles/articleValidator');
let initializeArticleFromReq = require('../../models/articles/initializeArticleFromReq');
let updateArticle = require('../../database/articles/updateArticle');
let selectArticle = require('../../database/articles/selectArticle');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  let article = initializeArticleFromReq(req);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(
    () => articleValidator.validate(article, 'put')
  ).then(() => {
    return selectArticle.withVisitIdAndLanguage(
      article.visitId,
      req.query.language
    ).catch(
      () => sendFailure(404, 'Article was not found')
    );
  }).then(articleData => {
    article.id = articleData.article_id;
    article.language = articleData.article_language;
  }).then(() => {

    if(articleValidator.failedFields.length > 0) {
      return sendFailure(400, {
        failedFields: articleValidator.failedFields
      });
    }

    return updateArticle(article);

  }).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};
