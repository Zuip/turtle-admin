let getUserPermissions = require('../../integrations/permissions/getUserPermissions');

module.exports = {
  cities(req, res) {
    getUserPermissionsToTarget(req, res, 'cities');
  },
  cityQuestions(req, res) {
    getUserPermissionsToTarget(req, res, 'city-questions');
  },
  users(req, res) {
    getUserPermissionsToTarget(req, res, 'users');
  }
};

function getUserPermissionsToTarget(req, res, target) {
  return getUserPermissions.withUserIdAndTarget(
    req.session.user.id,
    target
  ).then(permissions => {
    res.json(permissions);
  }).catch(error => {
    console.log(error);
    return res.status(500).json({});
  });
}
