// Middlewares
let authenticatedMiddleware = require('../middlewares/authenticated');

// Route files
let articleRoutes = require('./articleRoutes');
let countryRoutes = require('./countryRoutes');
let tripRoutes = require('./tripRoutes');
let userRoutes = require('./userRoutes');

// Controllers
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

  // Route files
  articleRoutes(app);
  countryRoutes(app);
  tripRoutes(app);
  userRoutes(app);
};
