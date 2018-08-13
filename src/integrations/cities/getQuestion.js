let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.cities.url);

module.exports = {
  withId(questionId) {
    return get(
      '/api/questions/' + questionId
    );
  },
  withIdAndLanguage(questionId, language) {
    return get(
      '/api/questions/' + questionId + '?language=' + language
    );
  }
};