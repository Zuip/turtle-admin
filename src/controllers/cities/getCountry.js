let getCountry = require('../../integrations/cities/getCountry');

module.exports = function(req, res) {
  getCountry.withIdAndLanguage(
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
