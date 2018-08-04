let getCountries = require('../../integrations/cities/getCountries');

module.exports = function(req, res) {
  return getCountries.withLanguage(
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
