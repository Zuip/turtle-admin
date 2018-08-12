let db = require('../connection');

module.exports = function(tripLanguageVersions) {
  return insertTripBase().then(trip => {

    tripLanguageVersions.map(tripLanguageVersion => {
      insertTranslatedTrip(
        trip.trip_id,
        tripLanguageVersion.name,
        tripLanguageVersion.urlName,
        tripLanguageVersion.language
      );
    });

    return trip.trip_id;
  });
};

function insertTripBase() {
  return db.one(`
    INSERT INTO trip DEFAULT VALUES
    RETURNING id AS trip_id
  `);
}

function insertTranslatedTrip(tripId, name, urlName, language) {
  db.none(
    `
      INSERT INTO translated_trip (trip_id, name, url_name, language)
      VALUES ($1, $2, $3, $4)
    `,
    [tripId, name, urlName, language]
  );
}
