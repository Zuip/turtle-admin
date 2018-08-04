let ArticleDataNaming = require('../articles/Article');
let isEmptyObject = require('../../objectFunctionalities/isEmptyObject');
let TripDataNaming = require('./Trip');

module.exports = function() {

  this.APINamed = undefined;
  this.DBNamed = undefined;

  this.transformDBToAPINamed = function() {

    if(typeof this.DBNamed === 'undefined') {
      return;
    }

    let articleDataNaming = new ArticleDataNaming();
    articleDataNaming.DBNamed = this.DBNamed;
    articleDataNaming.transformDBToAPINamed();

    let tripDataNaming = new TripDataNaming();
    tripDataNaming.DBNamed = this.DBNamed;
    tripDataNaming.transformDBToAPINamed();

    this.APINamed = {
      id: this.DBNamed.city_visit_id,
      article: articleDataNaming.APINamed,
      city: {
        id: this.DBNamed.city_id
      },
      trip: tripDataNaming.APINamed
    };

    if(isEmptyObject(this.APINamed)) {
      this.APINamed = undefined;
    }
  };
};
