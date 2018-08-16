let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.cities.url);

module.exports = {
  withUserIdAndTripId(userId, tripId) {
    return get(
      '/api/users/' + userId + '/trips/' + tripId + '/cities/comparison'
    );
  }
};