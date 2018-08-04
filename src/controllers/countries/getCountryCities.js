let getCities = require('../../integrations/cities/getCities');

module.exports = function(req, res) {
  getCities.withCountryIdAndLanguage(
    req.params.countryId,
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
