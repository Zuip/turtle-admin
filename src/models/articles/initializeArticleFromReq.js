let Article = require('./Article');

module.exports = function(req) {

  let article = new Article();

  if(typeof req.params.articleId !== 'undefined') {
    article.id = req.params.articleId;
  }

  if(typeof req.body.categoryId !== 'undefined') {
    article.categoryId = req.body.categoryId;
  }

  article.cityId = typeof req.body.cityId === 'number' ? req.body.cityId : null;
  article.topic = req.body.topic;
  article.urlName = req.body.urlName;
  article.summary = req.body.summary;
  article.text = req.body.text;
  article.published = req.body.published === 'yes' ? true : false;
  article.publish.date = req.body.publish.date;
  article.publish.time = req.body.publish.time;
  article.writers = req.body.writers;

  return article;
};
