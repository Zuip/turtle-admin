let selectCityVisit = require('../../../../database/trips/selectCityVisit');

module.exports = function() {

  let invalidURLNameCallback = function() { };

  this.setInvalidCallback = function(callback) {
    invalidURLNameCallback = callback;
  };

  this.validate = function(id) {

    if(id === null) {
      return Promise.resolve();
    }

    return selectCityVisit.withId(
      id
    ).then(function(data) {
      // A city visit id was found
    }).catch(function(error) {
      invalidURLNameCallback();
    });
  };
};
