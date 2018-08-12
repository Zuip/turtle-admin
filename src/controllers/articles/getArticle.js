let articleDataNaming = require('../../models/articles/articleDataNaming');
let selectArticle = require('../../database/articles/selectArticle');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(() => {
    return selectArticle.withVisitIdAndLanguage(
      req.params.visitId,
      req.query.language
    ).then(function(data) {
      articleDataNaming.setDBNamed(data);
      articleDataNaming.transformDBToAPINamed();
      return articleDataNaming.getAPINamed();
    }).catch(
      () => sendFailure(404, 'The article does not exist!')
    );
  }).then(
    article => res.json(article)
  ).catch(() => {
    // Promise chain ended 
  });
};
