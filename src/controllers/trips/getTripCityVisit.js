let selectArticleLanguageVersions = require('../../database/articles/selectArticleLanguageVersions');
let selectCityVisit = require('../../database/trips/selectCityVisit');
let VisitDataNaming = require('../../services/dataNaming/trips/Visit');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  selectCityVisit.withIdAndLanguage(
    req.params.visitId,
    language
  ).then(visit => {
    let visitDataNaming = new VisitDataNaming();
    visitDataNaming.DBNamed = visit;
    visitDataNaming.transformDBToAPINamed();
    return visitDataNaming.APINamed;
  }).then(visit => {

    if(typeof visit.article === 'undefined') {
      return visit;
    }

    return selectArticleLanguageVersions.withArticleId(
      visit.article.id
    ).then(languageVersions => {

      visit.article.languageVersions = languageVersions.map(languageVersion => {
        return languageVersion.language_code;
      });

      return visit;
    });

  }).then(visit => {
    res.json(visit);
  }).catch(() => {
    return res.status(404).json({
      success: false,
      message: "The visit does not exist!"
    });
  });
};
