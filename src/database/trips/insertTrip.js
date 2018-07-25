let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function(name, urlName) {
  return Promise.all([
    insertTripBase().then(trip => trip.trip_id),
    selectLanguages.all()
  ]).then(data => {
    createTranslatedTrips(name, urlName, data[0], data[1]);
  });
};

function createTranslatedTrips(name, urlName, tripId, languages) {
  languages.map(language => {
    insertTranslatedTrip(tripId, name, urlName, language.id);
  });
}

function insertTripBase() {
  return db.one(`
    INSERT INTO trip DEFAULT VALUES
    RETURNING id AS trip_id
  `);
}

function insertTranslatedTrip(tripId, name, urlName, languageId) {
  db.none(
    `
      INSERT INTO translated_trip (trip_id, name, url_name, language_id)
      VALUES ($1, $2, $3, $4)
    `,
    [tripId, name, urlName, languageId]
  );
}
