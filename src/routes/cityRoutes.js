let getCountriesController = require('../controllers/cities/getCountries');
let getCountryController = require('../controllers/cities/getCountry');
let getCitiesController = require('../controllers/cities/getCities');
let getCountryCitiesController = require('../controllers/cities/getCountryCities');
let getQuestionController = require('../controllers/cities/getQuestion');
let getQuestionsController = require('../controllers/cities/getQuestions');
let postCityController = require('../controllers/cities/postCity');
let postCountryController = require('../controllers/cities/postCountry');
let postQuestionController = require('../controllers/cities/postQuestion');


module.exports = function(app) {
  app.get('/api/cities', getCitiesController);
  app.get('/api/cities/questions', getQuestionsController);
  app.get('/api/cities/questions/:questionId', getQuestionController);
  app.get('/api/countries', getCountriesController);
  app.get('/api/countries/:countryId', getCountryController);
  app.get('/api/countries/:countryId/cities', getCountryCitiesController);
  app.post('/api/cities/questions', postQuestionController);
  app.post('/api/countries', postCountryController);
  app.post('/api/countries/:countryId/cities', postCityController);
};
