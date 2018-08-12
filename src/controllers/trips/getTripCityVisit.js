let getCity = require('../../integrations/cities/getCity');
let selectArticleLanguageVersions = require('../../database/articles/selectArticleLanguageVersions');
let selectCityVisit = require('../../database/trips/selectCityVisit');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');
let VisitDataNaming = require('../../services/dataNaming/trips/Visit');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(
    () => selectCityVisit.withIdAndLanguage(
      req.params.visitId,
      req.query.language
    ).catch(
      () => sendFailure(404, "The visit does not exist!")
    )
  ).then(visit => {
    let visitDataNaming = new VisitDataNaming();
    visitDataNaming.DBNamed = visit;
    visitDataNaming.transformDBToAPINamed();
    return visitDataNaming.APINamed;
  }).then(visit => {

    if(visit.article.id === null) {
      visit.article = null;
      return visit;
    }

    return selectArticleLanguageVersions.withArticleId(
      visit.article.id
    ).then(languageVersions => {

      visit.article.languageVersions = languageVersions.map(languageVersion => {
        return languageVersion.article_language;
      });

      return visit;
      
    }).catch(
      () => sendFailure(
        500,
        "There was an error in selecting articles from database!"
      )
    );
  }).then(visit => {

    return getCity.withIdAndLanguage(
      visit.city.id,
      req.query.language
    ).then(city => {
      visit.city.name = city.name;
      return visit;
    }).catch(
      error => sendFailure(error.status, error.message)
    );

  }).then(visit => {
    res.json(visit);
  }).catch(() => {
    // Promise chain ended
  });
};
