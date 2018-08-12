let createArrayFromYmdFormat = require('../../services/dates/createArrayFromYmdFormat');
let getCity = require('../../integrations/cities/getCity');
let getCityVisitFailedFields = require('../../services/failedFields/trips/cityVisit');
let insertCityVisit = require('../../database/trips/insertCityVisit');
let selectTrip = require('../../database/trips/selectTrip');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.all([
    getCity.withId(
      req.body.cityId
    ).catch(
      error => sendFailure(error.status, error.message)
    ),
    selectTrip.withId(
      req.params.tripId
    ).catch(
      () => sendFailure(404, 'The trip does not exist!')
    )
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
      return sendFailure(400).json({ failedFields });
    }

    return insertCityVisit(
      req.params.tripId,
      req.body.cityId,
      startDate,
      endDate,
      req.body.users
    ).catch(
      () => sendFailure(500, 'Saving visit failed')
    );
    
  }).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};
