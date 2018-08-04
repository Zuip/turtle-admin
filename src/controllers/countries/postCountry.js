let postCountry = require('../../integrations/cities/postCountry');
let user = require('../../services/permissions/getUserPermissionTo');

module.exports = function(req, res) {
  user(
    req.session.user.id
  ).isAllowedTo(
    'create'
  ).target(
    'cities'
  ).then(() => {
    postCountry(
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
