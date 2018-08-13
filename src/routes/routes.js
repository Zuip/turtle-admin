// Middlewares
let authenticatedMiddleware = require('../middlewares/authenticated');

// Route files
let articleRoutes = require('./articleRoutes');
let cityRoutes = require('./cityRoutes');
let tripRoutes = require('./tripRoutes');
let userRoutes = require('./userRoutes');

// Controllers
let getLanguagesController = require('../controllers/getLanguages');
let getUserController = require('../controllers/getUser');
let postLoginController = require('../controllers/postLogin');

module.exports = function(app) {

  // Always reload api calls: this prevents 304
  app.set('etag', false);

  // Routes without authentication
  app.get('/api/user', getUserController);
  app.post('/api/login', postLoginController);

  // Authentication middleware
  app.all('/api/*', authenticatedMiddleware);

  app.get('/api/languages', getLanguagesController);

  // Route files
  articleRoutes(app);
  cityRoutes(app);
  tripRoutes(app);
  userRoutes(app);
};
