let selectLanguage = require('../../database/selectLanguage');

module.exports = function(language) {
  return selectLanguage.withCode(language).then(
    () => Promise.resolve()
  ).catch(
    () => Promise.reject()
  );
};