let getComparison = require('../../integrations/cities/getComparison');

module.exports = function(req, res) {
  getComparison.withUserIdAndTripId(
    req.session.user.id,
    req.params.tripId
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
