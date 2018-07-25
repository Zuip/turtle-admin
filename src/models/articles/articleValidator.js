let VisitIdValidator = require('../../services/validators/trips/cityVisits/Id');

module.exports = {
  failedFields: [],
  validate(article, mode) {

    this.failedFields = [];

    let visitIdValidator = new VisitIdValidator();
    let validateFromDatabase = [];

    if(isEmptyString(article.text)) {
      this.failedFields.push("text");
    }

    visitIdValidator.setInvalidCallback(() => {
      this.failedFields.push("visitId");
    });

    if(mode === 'post') {
      validateFromDatabase.push(
        visitIdValidator.validate(article.visitId)
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
