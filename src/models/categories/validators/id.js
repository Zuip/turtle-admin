let selectCategory = require('../../../database/categories/selectCategory');

let invalidUrlNameCallback = function() { };

module.exports = {
  setInvalidCallback(callback) {
    invalidURLNameCallback = callback;
  },
  validate(id) {

    if(id === null) {
      return Promise.resolve();
    }

    return selectCategory.withId(
      id
    ).then(function(data) {
      // A category id was found or category id is null
    }).catch(function(error) {
      invalidURLNameCallback();
    });
  }
};
