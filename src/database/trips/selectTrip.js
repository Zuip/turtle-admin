let db = require('../connection');

module.exports = {
  withId(id) {
    return db.one(
      `
        SELECT trip.id AS trip_id
        FROM trip
        WHERE trip.id = $1
      `,
      [ id ]
    );
  },
  withIdAndLanguage(id, language) {
    return db.one(
      `
        SELECT trip.id AS trip_id,
               translated_trip.name AS trip_name
        FROM trip
        JOIN translated_trip ON translated_trip.trip_id = trip.id
        JOIN language ON language.id = translated_trip.language_id
        WHERE trip.id = $1
        AND language.code = $2
      `,
      [ id, language ]
    );
  },
  withUrlNameAndLanguage(urlName, language) {
    return db.one(
      `
        SELECT trip.id AS trip_id,
               translated_trip.name AS trip_name
        FROM trip
        JOIN translated_trip ON translated_trip.trip_id = trip.id
        JOIN language ON language.id = translated_trip.language_id
        WHERE translated_trip.url_name = $1
        AND language.code = $2
      `,
      [ urlName, language ]
    );
  }
};
