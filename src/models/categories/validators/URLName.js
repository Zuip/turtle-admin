let selectCategory = require('../../../database/categories/selectCategory');

module.exports = function() {

  let invalidUrlNameCallback = function() { };

  this.setInvalidCallback = function(callback) {
    invalidURLNameCallback = callback;
  };

  this.validate = function(urlName) {
    return selectCategory.withUrlName(
      urlName
    ).then(function(data) {
      invalidUrlNameCallback();
    }).catch(function(error) {
      // The article with same url name was not found, so we can continue
      // editing the article
    });
  };
};
