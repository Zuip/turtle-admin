let articleValidator = require('../../models/articles/articleValidator');
let initializeArticleFromReq = require('../../models/articles/initializeArticleFromReq');
let insertArticle = require('../../database/articles/insertArticle');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let updateCityVisitArticle = require('../../database/trips/updateCityVisitArticle');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);
  let article = initializeArticleFromReq(req);

  return Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(
    () => articleValidator.validate(article, 'post').then(() => {

      if(articleValidator.failedFields.length === 0) {
        return insertArticle(
          article
        ).catch(
          () => sendFailure(
            400,
            'Error in inserting the article to database'
          )
        );
      }

      return sendFailure(400, {
        failedFields: articleValidator.failedFields
      });
    })
  ).then(
    articleId => updateCityVisitArticle(
      article.visitId,
      articleId
    )
  ).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};
