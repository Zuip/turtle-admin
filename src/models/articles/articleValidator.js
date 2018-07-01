let CategoryIdValidator = require('../categories/validators/Id');
let CityIdValidator = require('../countries/validators/CityId');
let URLNameValidator = require('./validators/URLName');

module.exports = {
  failedFields: [],
  validate(article, mode) {

    this.failedFields = [];

    let categoryIdValidator = new CategoryIdValidator();
    let cityIdValidator = new CityIdValidator();
    let urlNameValidator = new URLNameValidator();

    if(isEmptyString(article.topic)) {
      this.failedFields.push("topic");
    }

    if(isEmptyString(article.urlName)) {
      this.failedFields.push("urlName");
    }

    categoryIdValidator.setInvalidCallback(() => {
      this.failedFields.push("categoryId");
    });

    cityIdValidator.setInvalidCallback(() => {
      this.failedFields.push("cityId");
    });

    urlNameValidator.setInvalidCallback(function(articleId) {
      if(mode === 'post' || articleId !== parseInt(article.id)) {
        this.failedFields.push("urlName");
      }
    });

    let validateFromDatabase = [
      urlNameValidator.validate(article.urlName),
      cityIdValidator.validate(article.cityId)
    ];

    if(mode === 'post') {
      validateFromDatabase.push(
        categoryIdValidator.validate(article.categoryId)
      );
    }

    return Promise.all(validateFromDatabase);
  }
};

function isEmptyString(value) {

  if(typeof value !== 'string') {
    return true;
  }

  if(value === null) {
    return true;
  }

  if(value === '') {
    return true;
  }

  return false;
}
