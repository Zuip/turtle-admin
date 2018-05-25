// Middlewares
let authenticatedMiddleware = require('../middlewares/authenticated');

// Controllers
let deleteCategoryController = require('../controllers/deleteCategory');
let getArticleController = require('../controllers/getArticle');
let getArticlesController = require('../controllers/getArticles');
let getCategoryController = require('../controllers/getCategory');
let getCategoriesController = require('../controllers/getCategories');
let getLogoutController = require('../controllers/getLogout');
let getUserController = require('../controllers/getUser');
let getUsersController = require('../controllers/getUsers');
let postArticleController = require('../controllers/postArticle');
let postCategoryController = require('../controllers/postCategory');
let postLoginController = require('../controllers/postLogin');

module.exports = function(app) {

  // Routes without authentication
  app.get('/api/user', getUserController);
  app.post('/api/login', postLoginController);

  // Authentication middleware
  app.all('/api/*', authenticatedMiddleware);

  // Routes with authentication
  app.delete('/api/categories/:categoryId', deleteCategoryController);
  app.get('/api/articles/:articleId', getArticleController);
  app.get('/api/categories/:categoryId/articles', getArticlesController);
  app.get('/api/categories/:categoryId', getCategoryController);
  app.get('/api/categories/:categoryId/categories', getCategoriesController);
  app.get('/api/logout', getLogoutController);
  app.get('/api/users', getUsersController);
  app.post('/api/articles', postArticleController);
  app.post('/api/categories', postCategoryController);
};
