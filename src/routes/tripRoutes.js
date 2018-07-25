let getTripsController = require('../controllers/trips/getTrips');
let getTripCityVisitController = require('../controllers/trips/getTripCityVisit');
let getTripCityVisitsController = require('../controllers/trips/getTripCityVisits');
let postTripController = require('../controllers/trips/postTrip');
let postCityVisitController = require('../controllers/trips/postCityVisit');

module.exports = function(app) {
  app.get('/api/trips', getTripsController);
  app.get('/api/trips/:tripId/visits', getTripCityVisitsController);
  app.get('/api/visits/:visitId', getTripCityVisitController);
  app.post('/api/trips', postTripController);
  app.post('/api/trips/:tripId/visits', postCityVisitController);
};
