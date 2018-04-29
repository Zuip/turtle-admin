// Middlewares
let authenticatedMiddleware = require('../middlewares/authenticated');

// Controllers
let deleteCategoryController = require('../controllers/deleteCategory');
let getCategoryController = require('../controllers/getCategory');
let getCategoriesController = require('../controllers/getCategories');
let getLogoutController = require('../controllers/getLogout');
let getUserController = require('../controllers/getUser');
let getUsersController = require('../controllers/getUsers');
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
  app.get('/api/categories/:categoryId', getCategoryController);
  app.get('/api/categories/:categoryId/categories', getCategoriesController);
  app.get('/api/logout', getLogoutController);
  app.get('/api/users', getUsersController);
  app.post('/api/categories', postCategoryController);
};
