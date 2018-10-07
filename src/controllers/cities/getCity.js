let getCity = require('../../integrations/cities/getCity');

module.exports = function(req, res) {
  return getCityPromise(
    req
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

function getCityPromise(req) {

  if(typeof req.query.language === 'undefined') {
    return getCity.withId(req.params.cityId);
  }

  return getCity.withIdAndLanguage(
    req.params.cityId,
    req.query.language
  );
}