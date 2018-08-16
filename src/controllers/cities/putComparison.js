let putComparison = require('../../integrations/cities/putComparison');

module.exports = function(req, res) {
  putComparison(
    req.session.user.id,
    req.params.tripId,
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
};
