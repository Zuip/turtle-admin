let articleValidator = require('../../models/articles/articleValidator');
let initializeArticleFromReq = require('../../models/articles/initializeArticleFromReq');
let insertArticle = require('../../database/articles/insertArticle');

module.exports = function(req, res) {

  let article = initializeArticleFromReq(req);

  articleValidator.validate(article, 'post').then(() => {

    if(articleValidator.failedFields.length > 0) {
      return res.json({
        success: false,
        failedFields: articleValidator.failedFields
      });
    }

    return insertArticle(article);

  }).then(() => {
    res.json({ success: true });
  }).catch(function(error) {
    console.log(error);
  });
};
