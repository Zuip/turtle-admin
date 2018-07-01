let getCountriesController = require('../controllers/countries/getCountries');
let getCitiesController = require('../controllers/countries/getCities');
let getCountryCitiesController = require('../controllers/countries/getCountryCities');
let postCityController = require('../controllers/countries/postCity');
let postCountryController = require('../controllers/countries/postCountry');

module.exports = function(app) {
  app.get('/api/cities', getCitiesController);
  app.get('/api/countries', getCountriesController);
  app.get('/api/countries/:countryId/cities', getCountryCitiesController);
  app.post('/api/countries', postCountryController);
  app.post('/api/countries/:countryId/cities', postCityController);
}
