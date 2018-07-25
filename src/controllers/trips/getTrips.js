let selectTrips = require('../../database/trips/selectTrips');
let TripDataNaming = require('../../services/dataNaming/trips/Trip');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  selectTrips.withUserIdAndLanguage(
    req.session.user.id,
    language
  ).then(trips => {
    return trips.map(trip => {
      tripDataNaming = new TripDataNaming();
      tripDataNaming.DBNamed = trip;
      tripDataNaming.transformDBToAPINamed();
      return tripDataNaming.APINamed;
    });
  }).then(trips => {
    res.json(trips);
  }).catch(error => {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "There was an error in selecting trips from database" + error
    });
  });
};
