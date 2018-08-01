let insertTrip = require('../../database/trips/insertTrip');
let insertTripUsers = require('../../database/trips/insertTripUsers');
let selectLanguages = require('../../database/selectLanguages');
let selectTrip = require('../../database/trips/selectTrip');
let validUrlName = require('../../services/validators/urlName');

module.exports = function(req, res) {

  let tripLanguageVersions = req.body.languageVersions;

  tripLanguageVersions.map(tripLanguageVersion => {
    if(!validTripName(tripLanguageVersion.name)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip name"
      });
    }
  });

  validateUrlNames(
    tripLanguageVersions, res
  ).then(
    () => transformLanguageCodesToLanguageIds(
      tripLanguageVersions,
      res
    )
  ).then(tripLanguageVersionsWithLanguageId => {
    return insertTrip(
      tripLanguageVersionsWithLanguageId
    ).then(tripId => {
      return insertTripUsers(
        tripId,
        req.body.users
      );
    }).then(() => {
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

function validateUrlNames(tripLanguageVersions, res) {

  tripLanguageVersions.map(tripLanguageVersion => {
    if(!validUrlName(tripLanguageVersion.urlName)) {

      res.status(400).json({
        success: false,
        message: "Invalid trip url name"
      });

      return Promise.resolve();
    }
  });

  return Promise.all(
    tripLanguageVersions.map(tripLanguageVersion => {
      return selectTrip.withUrlNameAndLanguage(
        tripLanguageVersion.urlName,
        tripLanguageVersion.language
      ).then(() => {
        return false;
      }).catch(() => {
        return true;
      });
    })
  ).then(urlNameChecks => {
    if(urlNameChecks.filter(validUrlName => !validUrlName).length > 0) {
      return res.status(400).json({
        success: false,
        message: "URL name already in use"
      });
    }
  });
}

function transformLanguageCodesToLanguageIds(tripLanguageVersions, res) {
  
  return selectLanguages.withCodes(
    tripLanguageVersions.map(
      tripLanguageVersion => tripLanguageVersion.language
    )
  ).then(languages => {
    return tripLanguageVersions.map(tripLanguageVersion => {

      for(i in languages) {
        if(languages[i].code === tripLanguageVersion.language) {
          tripLanguageVersion.languageId = languages[i].id;
          delete tripLanguageVersion.language;
          break;
        }
      }

      return tripLanguageVersion;
    });
  }).then(tripLanguageVersions => {

    for(i in tripLanguageVersions) {
      if(typeof tripLanguageVersions[i].language !== 'undefined') {

        res.status(400).json({
          success: false,
          message: "Invalid language code"
        });

        break;
      }
    }

    return tripLanguageVersions;
  });
}

function validTripName(name) {

  if(typeof name !== 'string') {
    return false;
  }

  return name !== '';
}