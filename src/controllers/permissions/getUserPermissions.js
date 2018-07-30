let getUserPermissions = require('../../integrations/permissions/getUserPermissions');

module.exports = {
  cities: function(req, res) {
    getUserPermissions.withUserIdAndTarget(
      req.session.user.id,
      'cities'
    ).then(permissions => {
      res.json(permissions);
    }).catch(error => {
      console.log(error);
      return res.status(500).json({});
    });
  }
};
