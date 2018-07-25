let selectLanguage = require('../../database/selectLanguage');
let insertTrip = require('../../database/trips/insertTrip');
let selectTrip = require('../../database/trips/selectTrip');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  if(!validTripName(req.body.name)) {
    return res.status(400).json({
      success: false,
      message: "Invalid trip name"
    });
  }

  if(!validTripUrlName(req.body.urlName)) {
    return res.status(400).json({
      success: false,
      message: "Invalid trip url name"
    });
  }

  selectTrip.withUrlNameAndLanguage(
    req.body.urlName,
    language
  ).then(() => {
    return res.status(400).json({
      success: false,
      message: "URL name already in use"
    });
  }).catch(() => {
    return selectLanguage.withCode(language);
  }).then(language => {
    return insertTrip(
      req.body.name,
      req.body.urlName,
      language.id
    ).then(data => {
      return res.json({
        success: true
      });
    });
  }).catch(error => {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Saving trip failed"
    });
  });
};

function validTripName(name) {

  if(typeof name !== 'string') {
    return false;
  }

  return name !== '';
}

function validTripUrlName(name) {

  if(!validTripName(name)) {
    return false;
  }

  return !hasUpperCase(name);
}

function hasUpperCase(str) {
  return (/[A-Z]/.test(str));
}