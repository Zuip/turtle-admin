let getArticleController = require('../controllers/articles/getArticle');
let getArticleImagesController = require('../controllers/articles/getArticleImages');
let getArticlesController = require('../controllers/articles/getArticles');
let postArticleController = require('../controllers/articles/postArticle');
let postArticleImageController = require('../controllers/articles/postArticleImage');
let putArticleController = require('../controllers/articles/putArticle');

module.exports = function(app) {
  app.get('/api/articles/images', getArticleImagesController);
  app.get('/api/articles/:articleId', getArticleController);
  app.get('/api/categories/:categoryId/articles', getArticlesController);
  app.post('/api/articles', postArticleController);
  app.post('/api/articles/images', postArticleImageController);
  app.put('/api/articles/:articleId', putArticleController);
}
