let db = require('../connection');

module.exports = {
  withTripIdAndLanguage(tripId, language) {
    return db.any(
      `
        SELECT city_visit.id AS city_visit_id,
               trip.id AS trip_id,
               translated_city.name AS city_name
        FROM trip
        JOIN city_visit ON city_visit.trip_id = trip.id
        JOIN city ON city.id = city_visit.city_id
        JOIN translated_city ON translated_city.city_id = city.id
        JOIN language ON language.id = translated_city.language_id
        WHERE trip.id = $1
        AND language.code = $2
      `,
      [ tripId, language ]
    );
  }
};
