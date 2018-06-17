// Middlewares
let authenticatedMiddleware = require('../middlewares/authenticated');

// Route files
let articleRoutes = require('./articleRoutes');
let categoryRoutes = require('./categoryRoutes');

// Controllers
let getLogoutController = require('../controllers/getLogout');
let getUserController = require('../controllers/getUser');
let getUsersController = require('../controllers/getUsers');
let postLoginController = require('../controllers/postLogin');

module.exports = function(app) {

  // Always reload api calls: this prevents 304
  app.set('etag', false);

  // Routes without authentication
  app.get('/api/user', getUserController);
  app.post('/api/login', postLoginController);

  // Authentication middleware
  app.all('/api/*', authenticatedMiddleware);

  /*
  * Routes with authentication
  */

  app.get('/api/logout', getLogoutController);
  app.get('/api/users', getUsersController);

  // Route files
  articleRoutes(app);
  categoryRoutes(app);
};
