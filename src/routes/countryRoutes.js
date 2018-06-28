let getCountriesController = require('../controllers/countries/getCountries');
let getCitiesController = require('../controllers/countries/getCities');
let postCityController = require('../controllers/countries/postCity');
let postCountryController = require('../controllers/countries/postCountry');

module.exports = function(app) {
  app.get('/api/countries/:countryId/cities', getCitiesController);
  app.get('/api/countries', getCountriesController);
  app.post('/api/countries/:countryId/cities', postCityController);
  app.post('/api/countries', postCountryController);
}
