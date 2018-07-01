let selectArticle = require('../../../database/articles/selectArticle');

let invalidUrlNameCallback = function() { };

module.exports = {
  setInvalidCallback(callback) {
    invalidURLNameCallback = callback;
  },
  validate(urlName) {
    return selectArticle.withUrlName(
      urlName
    ).then(function(data) {
      invalidUrlNameCallback();
    }).catch(function(error) {
      // The article with same url name was not found, so we can continue
      // editing the article
    });
  }
};
