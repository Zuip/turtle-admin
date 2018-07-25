let ArticleDataNaming = require('../articles/Article');
let CityDataNaming = require('../cities/City');
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

    let cityDataNaming = new CityDataNaming();
    cityDataNaming.DBNamed = this.DBNamed;
    cityDataNaming.transformDBToAPINamed();

    let tripDataNaming = new TripDataNaming();
    tripDataNaming.DBNamed = this.DBNamed;
    tripDataNaming.transformDBToAPINamed();

    this.APINamed = {
      id: this.DBNamed.city_visit_id,
      article: articleDataNaming.APINamed,
      city: cityDataNaming.APINamed,
      trip: tripDataNaming.APINamed
    };

    if(isEmptyObject(this.APINamed)) {
      this.APINamed = undefined;
    }
  };
};
