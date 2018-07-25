let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function(name, urlName, languageId) {
  return insertTripBase().then(trip => {
    insertTranslatedTrip(trip.trip_id, name, urlName, languageId);
    return trip.trip_id;
  });
};

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
