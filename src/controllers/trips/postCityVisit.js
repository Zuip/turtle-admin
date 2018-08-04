let insertCityVisit = require('../../database/trips/insertCityVisit');
let getCity = require('../../integrations/cities/getCity');
let selectTrip = require('../../database/trips/selectTrip');

module.exports = function(req, res) {

  Promise.all([
    getCity.withId(
      req.body.cityId
    ).catch((error) => {
      res.status(error.status).json(error.message);
      return Promise.reject();
    }),
    selectTrip.withId(req.params.tripId).catch(error => {

      res.status(404).json({
        success: false,
        message: "The trip does not exist!"
      });

      return Promise.reject();
    })
  ]).then(data => {

    return insertCityVisit(
      req.params.tripId,
      req.body.cityId,
      req.body.start,
      req.body.end,
      req.body.users
    ).catch(() => {

      return res.status(500).json({
        success: false,
        message: "Saving city failed"
      });

      return Promise.reject();
    });
  }).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};
