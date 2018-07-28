let db = require('../connection');

module.exports = function(tripId, cityId, visitStart, visitEnd) {
  return db.none(
    `
      INSERT INTO city_visit (
        trip_id,
        city_id,
        visit_start,
        visit_end
      ) VALUES (
        $1,
        $2,
        $3,
        $4
      )
    `,
    [
      tripId,
      cityId,
      visitStart,
      visitEnd
    ]
  );
};
