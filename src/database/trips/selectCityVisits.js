let db = require('../connection');

module.exports = {
  withTripId(tripId) {
    return db.any(
      `
        SELECT city_visit.id AS city_visit_id,
               city_visit.city_id AS city_id
        FROM trip
        JOIN city_visit ON city_visit.trip_id = trip.id
        WHERE trip.id = $1
      `,
      [ tripId ]
    );
  }
};
