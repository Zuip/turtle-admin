let selectArticle = require('../../database/articles/selectArticle');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let updateArticleTranslationPublished = require('../../database/articles/updateArticleTranslationPublished');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(
    () => selectArticle.withVisitId(
      req.params.visitId
    ).then(visitArticle => {
      if(req.body.published === true) {
        return updateArticleTranslationPublished(
          visitArticle.article_id,
          req.query.language
        );
      }
    })
  ).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};
