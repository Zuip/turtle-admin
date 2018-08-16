let PutCreator = require('../crudCreators/PutCreator');
let config = require('../../../config');
let put = PutCreator(config.integrations.cities.url);

module.exports = function(userId, tripId, rankedCityIds) {
  return put(
    '/api/users/' + userId + '/trips/' + tripId + '/cities/comparison',
    rankedCityIds
  );
};