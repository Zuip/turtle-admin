let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.cities.url);

module.exports = {
  withCountryIdAndLanguage(countryId, language) {
    return get(
      '/api/countries/' + countryId + '/cities?language=' + language
    );
  },
  withIdsAndLanguage(ids, language) {
    return get(
      '/api/cities?language=' + language + '&ids=' + ids.join(',')
    );
  },
  withLanguage(language) {
    return get(
      '/api/cities?language=' + language
    );
  }
};