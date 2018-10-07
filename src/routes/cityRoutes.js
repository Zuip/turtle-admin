let getComparisonController = require('../controllers/cities/getComparison');
let getCountriesController = require('../controllers/cities/getCountries');
let getCountryController = require('../controllers/cities/getCountry');
let getCitiesController = require('../controllers/cities/getCities');
let getCityController = require('../controllers/cities/getCity');
let getCountryCitiesController = require('../controllers/cities/getCountryCities');
let getQuestionController = require('../controllers/cities/getQuestion');
let getQuestionsController = require('../controllers/cities/getQuestions');
let postCityController = require('../controllers/cities/postCity');
let postCountryController = require('../controllers/cities/postCountry');
let postQuestionController = require('../controllers/cities/postQuestion');
let putCityController = require('../controllers/cities/putCity');
let putComparisonController = require('../controllers/cities/putComparison');

module.exports = function(app) {
  app.get('/api/cities', getCitiesController);
  app.get('/api/cities/questions', getQuestionsController);
  app.get('/api/cities/questions/:questionId', getQuestionController);
  app.get('/api/countries', getCountriesController);
  app.get('/api/countries/:countryId', getCountryController);
  app.get('/api/countries/:countryId/cities', getCountryCitiesController);
  app.get('/api/cities/:cityId', getCityController);
  app.get('/api/trips/:tripId/cities/comparisons', getComparisonController);
  app.post('/api/cities/questions', postQuestionController);
  app.post('/api/countries', postCountryController);
  app.post('/api/countries/:countryId/cities', postCityController);
  app.put('/api/cities/:cityId', putCityController);
  app.put('/api/trips/:tripId/cities/comparisons', putComparisonController);
};
