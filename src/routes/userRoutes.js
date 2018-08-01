let getLogoutController = require('../controllers/getLogout');
let getUserPermissionsController = require('../controllers/permissions/getUserPermissions');
let getUsersController = require('../controllers/getUsers');

module.exports = function(app) {
  app.get('/api/logout', getLogoutController);
  app.get('/api/user/permissions/cities', getUserPermissionsController.cities);
  app.get('/api/user/permissions/users', getUserPermissionsController.users);
  app.get('/api/users', getUsersController);
};
