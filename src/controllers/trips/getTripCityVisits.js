let selectCityVisits = require('../../database/trips/selectCityVisits');
let selectTrip = require('../../database/trips/selectTrip');
let VisitDataNaming = require('../../services/dataNaming/trips/Visit');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  selectTrip.withIdAndLanguage(req.params.tripId, language).then(data => {
    selectCityVisits.withTripIdAndLanguage(
      req.params.tripId,
      language
    ).then(cityVisits => {
      return cityVisits.map(cityVisit => {
        let visitDataNaming = new VisitDataNaming();
        visitDataNaming.DBNamed = cityVisit;
        visitDataNaming.transformDBToAPINamed();
        return visitDataNaming.APINamed;
      });
    }).then(cityVisits => {
      res.json(cityVisits);
    }).catch(error => {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "There was an error in selecting city visits from database"
      });
    });
  }).catch(error => {
    return res.status(404).json({
      success: false,
      message: "The trip does not exist!"
    });
  });
};
