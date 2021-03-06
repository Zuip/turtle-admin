let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.cities.url);

module.exports = {
  withIdAndLanguage(countryId, language) {
    return get(
      '/api/countries/' + countryId + '?language=' + language
    );
  }
};