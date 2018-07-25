let selectCity = require('../../../database/countries/selectCity');

module.exports = function() {

  let invalidUrlNameCallback = function() { };

  this.setInvalidCallback = function(callback) {
    invalidURLNameCallback = callback;
  };

  this.validate = function(id) {

    if(id === null) {
      return Promise.resolve();
    }

    return selectCity.withId(
      id
    ).then(function(data) {
      // City id was found
    }).catch(function(error) {
      invalidCityCallback();
    });
  };
};
