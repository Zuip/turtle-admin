let selectCities = require('../../database/countries/selectCities');
let CityDataNaming = require('../../services/dataNaming/cities/City');
let mapCitiesToCountries = require('../../services/cities/mapCitiesToCountries');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  selectCities.withLanguage(
    language
  ).then(cities => {
    return cities.map(city => {
      cityDataNaming = new CityDataNaming();
      cityDataNaming.DBNamed = city;
      cityDataNaming.transformDBToAPINamed();
      return cityDataNaming.APINamed;
    });
  }).then(cities => {
    res.json(mapCitiesToCountries(cities));
  }).catch(error => {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "There was an error in selecting cities from database"
    });
  });
};
