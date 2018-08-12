let insertTrip = require('../../database/trips/insertTrip');
let insertTripUsers = require('../../database/trips/insertTripUsers');
let selectTrip = require('../../database/trips/selectTrip');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');
let validUrlName = require('../../services/validators/urlName');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  let tripLanguageVersions = req.body.languageVersions;

  Promise.resolve().then(
    () => validateTripNames(tripLanguageVersions, sendFailure)
  ).then(
    () => validateUrlNames(tripLanguageVersions, sendFailure)
  ).then(
    () => insertTrip(
      tripLanguageVersions
    ).then(tripId => {
      return insertTripUsers(
        tripId,
        req.body.users
      );
    }).catch(
      error => sendFailure(500, 'Saving trip failed' + error)
    )
  ).then(
    () => res.json({ success: true })
  ).catch(() => {
    // Promise chain ended
  });
};

function validateTripNames(tripLanguageVersions, sendFailure) {
  return Promise.all(
    tripLanguageVersions.map(tripLanguageVersion => {
      if(!validTripName(tripLanguageVersion.name)) {
        return sendFailure(400, 'Invalid trip name');
      }
    })
  );
}

function validateUrlNames(tripLanguageVersions, sendFailure) {
  return Promise.all(
    tripLanguageVersions.map(tripLanguageVersion => {
      if(!validUrlName(tripLanguageVersion.urlName)) {
        return sendFailure(400, 'Invalid trip url name');
      }
    })
  ).then(
    () => Promise.all(
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
    )
  ).then(urlNameChecks => {
    if(urlNameChecks.filter(validUrlName => !validUrlName).length > 0) {
      return sendFailure(400, 'URL name already in use');
    }
  });
}

function validTripName(name) {

  if(typeof name !== 'string') {
    return false;
  }

  return name !== '';
}