let postCity = require('../../integrations/cities/postCity');
let user = require('../../services/permissions/getUserPermissionTo');

module.exports = function(req, res) {

  user(
    req.session.user.id
  ).isAllowedTo(
    'create'
  ).target(
    'cities'
  ).then(() => {
    postCity(
      req.params.countryId,
      req.body
    ).then(
      response => res.json(response)
    ).catch(
      response => res.status(
        response.status
      ).json(
        response.message
      )
    );
  }).catch(() => {
    res.status(401).json({});
  });
};
