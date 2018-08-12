let selectTrips = require('../../database/trips/selectTrips');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let TripDataNaming = require('../../services/dataNaming/trips/Trip');
let validateLanguage = require('../../services/routing/validateLanguage');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(
    () => validateLanguage(req.query.language, sendFailure)
  ).then(() => {
    return selectTrips.withUserIdAndLanguage(
      req.session.user.id,
      req.query.language
    ).catch(
      () => sendFailure(
        500,
        'There was an error in selecting trips from database'
      )
    );
  }).then(
    trips => trips.map(trip => {
      tripDataNaming = new TripDataNaming();
      tripDataNaming.DBNamed = trip;
      tripDataNaming.transformDBToAPINamed();
      return tripDataNaming.APINamed;
    })
  ).then(trips => {
    res.json(trips);
  }).catch(() => {
    // Promise chain ended
  });
};
