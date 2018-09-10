let Article = require('./Article');

module.exports = function(req) {

  let article = new Article();

  if(typeof req.params.visitId !== 'undefined') {
    article.visitId = req.params.visitId;
  }

  article.summary = req.body.summary;
  article.text = req.body.text;
  article.language = req.query.language;

  return article;
};
