let db = require('../connection');

module.exports = {
  withUserIdAndLanguage(userId, language) {
    return db.any(
      `
        SELECT trip.id AS trip_id,
               translated_trip.name AS trip_name
        FROM trip
        JOIN translated_trip ON translated_trip.trip_id = trip.id
        JOIN trip_user ON trip_user.trip_id = trip.id
        WHERE trip_user.user_id = $1
        AND translated_trip.language = $2
      `,
      [ userId, language ]
    );
  }
};
