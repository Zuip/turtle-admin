let selectCities = require('../../database/countries/selectCities');
let selectCountry = require('../../database/countries/selectCountry');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  selectCountry.withIdAndLanguage(req.params.countryId, language).then(data => {
    selectCities.withCountryIdAndLanguage(
      req.params.countryId,
      language
    ).then(cities => {
      res.json(cities);
    }).catch(error => {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "There was an error in selecting cities from database"
      });
    });
  }).catch(error => {
    return res.status(404).json({
      success: false,
      message: "The country does not exist!"
    });
  });
};
