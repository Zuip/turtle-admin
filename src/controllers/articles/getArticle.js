let articleDataNaming = require('../../models/articles/articleDataNaming');
let selectArticle = require('../../database/articles/selectArticle');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  selectArticle.withVisitIdAndLanguage(
    req.params.visitId,
    language
  ).then(function(data) {
    articleDataNaming.setDBNamed(data);
    articleDataNaming.transformDBToAPINamed();
    res.json(articleDataNaming.getAPINamed());
  }).catch(function(error) {
    res.status(404).json({
      success: false,
      message: "The article does not exist!"
    });
  });
};
