let selectCity = require('../../../database/countries/selectCity');

let invalidUrlNameCallback = function() { };

module.exports = {
  setInvalidCallback(callback) {
    invalidURLNameCallback = callback;
  },
  validate(id) {

    if(id === null) {
      return Promise.resolve();
    }

    return selectCity.withId(
      id
    ).then(function(data) {
      // A category id was found or category id is null
    }).catch(function(error) {
      invalidCityCallback();
    });
  }
};
