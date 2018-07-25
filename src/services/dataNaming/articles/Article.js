let isEmptyObject = require('../../objectFunctionalities/isEmptyObject');

module.exports = function() {

  this.APINamed = undefined;
  this.DBNamed = undefined;

  this.transformDBToAPINamed = function() {

    if(typeof this.DBNamed === 'undefined') {
      return;
    }

    this.APINamed = {
      id: this.DBNamed.article_id
    };

    if(isEmptyObject(this.APINamed)) {
      this.APINamed = undefined;
    }
  };
};