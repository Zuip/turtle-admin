let Article = require('./Article');

module.exports = function(req) {

  let article = new Article();

  if(typeof req.params.visitId !== 'undefined') {
    article.visitId = req.params.visitId;
  }

  article.summary = req.body.summary;
  article.text = req.body.text;
  article.published = req.body.published === 'yes' ? true : false;
  article.publish.date = req.body.publish.date;
  article.publish.time = req.body.publish.time;
  article.writers = req.body.writers;

  return article;
};
