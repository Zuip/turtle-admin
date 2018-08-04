let getCities = require('../../integrations/cities/getCities');

module.exports = function(req, res) {
  return getCities.withLanguage(
    req.query.language
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
