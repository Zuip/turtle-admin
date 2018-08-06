let createArrayFromYmdFormat = require('../../services/dates/createArrayFromYmdFormat');
let getCity = require('../../integrations/cities/getCity');
let getCityVisitFailedFields = require('../../services/failedFields/trips/cityVisit');
let insertCityVisit = require('../../database/trips/insertCityVisit');
let selectTrip = require('../../database/trips/selectTrip');

module.exports = function(req, res) {

  Promise.all([
    getCity.withId(
      req.body.cityId
    ).catch((error) => {
      res.status(error.status).json(error.message);
      return Promise.reject();
    }),
    selectTrip.withId(
      req.params.tripId
    ).catch(() => {

      res.status(404).json({
        success: false,
        message: "The trip does not exist!"
      });

      return Promise.reject();
    })
  ]).then(() => {

    let startDate = createArrayFromYmdFormat(req.body.start, '-');
    let endDate = createArrayFromYmdFormat(req.body.end, '-');

    let fieldsToValidate = {
      startDate,
      endDate,
      originalValues: {
        start: req.body.start,
        end: req.body.end
      }
    };

    let failedFields = getCityVisitFailedFields(fieldsToValidate);
    if(failedFields.length > 0) {

      res.status(400).json({
        success: false,
        failedFields
      });

      return Promise.reject();
    }

    return insertCityVisit(
      req.params.tripId,
      req.body.cityId,
      startDate,
      endDate,
      req.body.users
    ).catch(error => {

      return res.status(500).json({
        success: false,
        message: "Saving visit failed" + error
      });

      return Promise.reject();
    });
  }).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};
