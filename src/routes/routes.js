// Middlewares
let authenticatedMiddleware = require('../middlewares/authenticated');

// Controllers
let deleteCategoryController = require('../controllers/deleteCategory');
let getLogoutController = require('../controllers/getLogout');
let getUserController = require('../controllers/getUser');
let getCategoriesController = require('../controllers/getCategories');
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
  app.get('/api/categories/:categoryId/categories', getCategoriesController);
  app.get('/api/logout', getLogoutController);
  app.post('/api/categories', postCategoryController);
};
