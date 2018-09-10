let getArticleController = require('../controllers/articles/getArticle');
let getArticleImagesController = require('../controllers/articles/getArticleImages');
let getAvailableArticleTranslationsController = require('../controllers/articles/getAvailableArticleTranslations');
let postArticleController = require('../controllers/articles/postArticle');
let postArticleTranslationController = require('../controllers/articles/postArticleTranslation');
let postArticleImageController = require('../controllers/articles/postArticleImage');
let postArticleImageFolderController = require('../controllers/articles/postArticleImageFolder');
let putArticleController = require('../controllers/articles/putArticle');
let putArticleTranslationPublishedController = require('../controllers/articles/putArticleTranslationPublished');

module.exports = function(app) {
  app.get('/api/articles/images', getArticleImagesController);
  app.get('/api/visits/:visitId/article', getArticleController);
  app.get('/api/visits/:visitId/article/translations/available', getAvailableArticleTranslationsController);
  app.post('/api/visits/:visitId/article', postArticleController);
  app.post('/api/visits/:visitId/article/translations', postArticleTranslationController);
  app.post('/api/articles/images', postArticleImageController);
  app.post('/api/articles/images/folders', postArticleImageFolderController);
  app.put('/api/visits/:visitId/article', putArticleController);
  app.put('/api/visits/:visitId/article/translations/published', putArticleTranslationPublishedController);
};
