let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.languages.url);

module.exports = {
  all() {
    return get(
      '/api/languages'
    );
  },
  translatedIn(translatedIn) {
    return get(
      '/api/languages?language=' + translatedIn
    );
  }
};
