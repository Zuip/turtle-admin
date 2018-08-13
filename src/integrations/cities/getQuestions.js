let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.cities.url);

module.exports = {
  withIdsAndLanguage(ids, language) {
    return get(
      '/api/questions?language=' + language + '&ids=' + ids.join(',')
    );
  },
  withLanguage(language) {
    return get(
      '/api/questions?language=' + language
    );
  }
};