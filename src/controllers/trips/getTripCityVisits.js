let getCities = require('../../integrations/cities/getCities');
let selectCityVisits = require('../../database/trips/selectCityVisits');
let selectTrip = require('../../database/trips/selectTrip');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validateLanguage = require('../../services/routing/validateLanguage');
let VisitDataNaming = require('../../services/dataNaming/trips/Visit');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(
      req.query.language
    ).catch(
      () => sendFailure(
        404,
        'Missing mandatory get parameter: language'
      )
    )
  ).then(
    () => selectTrip.withIdAndLanguage(
      req.params.tripId,
      req.query.language
    ).catch(
      () => sendFailure(404, "The trip does not exist!")
    )
  ).then(
    () => selectCityVisits.withTripId(
      req.params.tripId
    ).catch(
      () => sendFailure(
        500,
        "There was an error in selecting city visits from database"
      )
    )
  ).then(
    cityVisits => cityVisits.map(cityVisit => {
      let visitDataNaming = new VisitDataNaming();
      visitDataNaming.DBNamed = cityVisit;
      visitDataNaming.transformDBToAPINamed();
      return visitDataNaming.APINamed;
    })
  ).then(cityVisits => {

    let cityIds = cityVisits.map(
      cityVisit => cityVisit.city.id
    );

    return getCities.withIdsAndLanguage(
      cityIds,
      req.query.language
    ).then(citiesByCountries => {

      let cities = citiesByCountries[0].cities;

      return cityVisits.map(cityVisit => {
        let city = cities.find(city => city.id === cityVisit.city.id);
        cityVisit.city.name = city.name;
        return cityVisit;
      });
    }).catch(
      error => sendFailure(
        error.status,
        error.message
      )
    );
  }).then(cityVisits => {
    res.json(cityVisits);
  }).catch(() => {
    // Promise chain ended
  });
};
