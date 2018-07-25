let getArticleController = require('../controllers/articles/getArticle');
let getArticleImagesController = require('../controllers/articles/getArticleImages');
let postArticleController = require('../controllers/articles/postArticle');
let postArticleImageController = require('../controllers/articles/postArticleImage');
let postArticleImageFolderController = require('../controllers/articles/postArticleImageFolder');
let putArticleController = require('../controllers/articles/putArticle');

module.exports = function(app) {
  app.get('/api/articles/images', getArticleImagesController);
  app.get('/api/visits/:visitId/article', getArticleController);
  app.post('/api/visits/:visitId/articles', postArticleController);
  app.post('/api/articles/images', postArticleImageController);
  app.post('/api/articles/images/folders', postArticleImageFolderController);
  app.put('/api/visits/:visitId/article', putArticleController);
};
