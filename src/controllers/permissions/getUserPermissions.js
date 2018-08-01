let getUserPermissions = require('../../integrations/permissions/getUserPermissions');

module.exports = {
  cities(req, res) {
    getUserPermissionsToTarget(req, res, 'cities');
  },
  users(req, res) {
    getUserPermissionsToTarget(req, res, 'users');
  }
};

function getUserPermissionsToTarget(req, res, target) {
  getUserPermissions.withUserIdAndTarget(
    req.session.user.id,
    target
  ).then(permissions => {
    res.json(permissions);
  }).catch(error => {
    console.log(error);
    return res.status(500).json({});
  });
}
