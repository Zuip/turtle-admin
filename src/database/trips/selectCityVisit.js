let db = require('../connection');

module.exports = {
  withId(id) {
    return db.one(
      `
        SELECT city_visit.id AS city_visit_id
        FROM city_visit
        WHERE city_visit.id = $1
      `,
      [ id ]
    );
  },
  withIdAndLanguage(id, language) {
    return db.one(
      `
        SELECT city_visit.id AS city_visit_id,
               city_visit.city_id AS city_id,
               city_visit.article_id AS article_id,
               trip.id AS trip_id,
               translated_trip.name AS trip_name
        FROM city_visit
        JOIN trip ON trip.id = city_visit.trip_id
        JOIN translated_trip ON translated_trip.trip_id = trip.id
        JOIN language ON language.id = translated_trip.language_id
        WHERE city_visit.id = $1
        AND language.code = $2
      `,
      [ id, language ]
    );
  }
};
