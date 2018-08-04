let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.cities.url);

module.exports = {
  withId(cityId) {
    return get(
      '/api/cities/' + cityId
    );
  },
  withIdAndLanguage(cityId, language) {
    return get(
      '/api/cities/' + cityId + '?language=' + language
    );
  }
};