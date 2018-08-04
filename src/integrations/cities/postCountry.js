let PostCreator = require('../crudCreators/PostCreator');
let config = require('../../../config');
let post = PostCreator(config.integrations.cities.url);

module.exports = function(data) {
  return post(
    '/api/countries',
    data
  );
};