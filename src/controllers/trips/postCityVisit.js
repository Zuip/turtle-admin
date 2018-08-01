let insertCityVisit = require('../../database/trips/insertCityVisit');
let selectCity = require('../../database/countries/selectCity');
let selectTrip = require('../../database/trips/selectTrip');

module.exports = function(req, res) {

  Promise.all([
    selectCity.withId(req.body.cityId).catch(error => {
      return res.status(404).json({
        success: false,
        message: "The city does not exist!"
      });
    }),
    selectTrip.withId(req.params.tripId).catch(error => {
      return res.status(404).json({
        success: false,
        message: "The trip does not exist!"
      });
    })
  ]).then(data => {
    return insertCityVisit(
      req.params.tripId,
      req.body.cityId,
      req.body.start,
      req.body.end,
      req.body.users
    ).then(data => {
      return res.json({
        success: true
      });
    });
  }).catch(error => {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Saving city failed"
    });
  });
};
