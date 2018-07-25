let isEmptyObject = require('../../objectFunctionalities/isEmptyObject');

module.exports = function() {

  this.APINamed = undefined;
  this.DBNamed = undefined;

  this.transformDBToAPINamed = function() {

    if(typeof this.DBNamed === 'undefined') {
      return;
    }

    this.APINamed = {
      id: this.DBNamed.trip_id,
      name: this.DBNamed.trip_name
    };

    if(isEmptyObject(this.APINamed)) {
      this.APINamed = undefined;
    }
  };
};
