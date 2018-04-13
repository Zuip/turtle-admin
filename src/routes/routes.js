// Middlewares
let authenticatedMiddleware = require('../middlewares/authenticated');

// Controllers
let postLoginController = require('../controllers/postLogin');

module.exports = function(app) {

  app.post('/api/login', postLoginController);

  app.all('/api/*', authenticatedMiddleware);

  app.get('/api/user', function(req, res) {
    res.json({ result: req.session.user });
  });
};
