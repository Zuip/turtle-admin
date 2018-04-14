// Middlewares
let authenticatedMiddleware = require('../middlewares/authenticated');

// Controllers
let postLoginController = require('../controllers/postLogin');

module.exports = function(app) {

  app.post('/api/login', postLoginController);

  app.get('/api/user', function(req, res) {
    if(typeof req.session.user === 'undefined') {
      res.json({ user: null });
    } else {
      res.json({ user: req.session.user });
    }
  });

  app.all('/api/*', authenticatedMiddleware);
};
