let CategoryIdValidator = require('../categories/validators/Id');
let URLNameValidator = require('./validators/URLName');

module.exports = {
  failedFields: [],
  validate: function(category, mode) {

    let categoryIdValidator = new CategoryIdValidator();
    let urlNameValidator = new URLNameValidator();

    if(isEmptyString(category.name)) {
      this.failedFields.push("name");
    }

    if(isEmptyString(category.urlName)) {
      this.failedFields.push("urlName");
    }

    urlNameValidator.setInvalidCallback(categoryId => {
      if(mode === 'post' || categoryId !== parseInt(category.id)) {
        this.failedFields.push("urlName");
      }
    });

    categoryIdValidator.setInvalidCallback(() => {
      this.failedFields.push("parent");
    });

    let validateFromDatabase = [
      urlNameValidator.validate(category.urlName)
    ];

    if(mode === 'post') {
      validateFromDatabase.push(
        categoryIdValidator.validate(category.parentId)
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
