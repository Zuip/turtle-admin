let db = require('../connection');

module.exports = function(tripId, cityId) {
  return db.none(
    `
      INSERT INTO city_visit (
        trip_id,
        city_id
      ) VALUES (
        $1,
        $2
      )
    `,
    [
      tripId,
      cityId
    ]
  );
};
