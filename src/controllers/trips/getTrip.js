let selectTrip = require('../../database/trips/selectTrip');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let TripDataNaming = require('../../services/dataNaming/trips/Trip');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(() => {
    return selectTrip.withIdAndLanguage(
      req.params.tripId,
      req.query.language
    ).catch(
      () => sendFailure(
        500,
        'There was an error in selecting trips from database'
      )
    );
  }).then(trip => {
    tripDataNaming = new TripDataNaming();
    tripDataNaming.DBNamed = trip;
    tripDataNaming.transformDBToAPINamed();
    return tripDataNaming.APINamed;
  }).then(
    trip => res.json(trip)
  ).catch(() => {
    // Promise chain ended
  });
};
