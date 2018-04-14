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
      res.json({ user: { name: req.session.user.name }});
    }
  });

  app.all('/api/*', authenticatedMiddleware);

  app.get('/api/logout', function(req, res) {
    req.session.destroy();
    res.json({ success: true });
  });
};
