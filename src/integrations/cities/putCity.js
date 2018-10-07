let PutCreator = require('../crudCreators/PutCreator');
let config = require('../../../config');
let put = PutCreator(config.integrations.cities.url);

module.exports = function(cityId, data) {
  return put(
    '/api/cities/' + cityId,
    data
  );
};