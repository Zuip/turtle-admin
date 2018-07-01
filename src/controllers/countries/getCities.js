let selectCities = require('../../database/countries/selectCities');
let CityDataNaming = require('../../models/countries/CityDataNaming');

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
      CityDataNaming.setDBNamed(city);
      CityDataNaming.transformDBToAPINamed();
      return CityDataNaming.getAPINamed();
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

function mapCitiesToCountries(cities) {

  let countries = {};

  cities.map(city => {

    if(typeof countries[city.countryId] === 'undefined') {
      countries[city.countryId] = initializeCountry(city);
    }

    countries[city.countryId].cities.push(initializeCity(city));
  });

  return Object.values(countries);
}

function initializeCountry(city) {
  return {
    id: city.countryId,
    name: city.countryName,
    cities: []
  };
}

function initializeCity(city) {
  return {
    id: city.id,
    name: city.name
  };
}
