let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.cities.url);

module.exports = {
  withLanguage(language) {
    return get(
      '/api/countries?language=' + language
    );
  }
};