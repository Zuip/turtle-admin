let selectCategory = require('../../../database/categories/selectCategory');

module.exports = function() {

  let invalidUrlNameCallback = function() { };

  this.setInvalidCallback = function(callback) {
    invalidURLNameCallback = callback;
  };

  this.validate = function(id) {

    if(id === null) {
      return Promise.resolve();
    }

    return selectCategory.withId(
      id
    ).then(function(data) {
      // A category id was found or category id is null
    }).catch(function(error) {
      this.invalidURLNameCallback();
    });
  };
};
