let db = require('../connection');

module.exports = {
  withTripId(tripId) {
    return db.any(
      `
        SELECT trip_user.trip_id AS trip_id,
               trip_user.user_id AS user_id
        FROM trip_user
        WHERE trip_user.trip_id = $1
      `,
      [ tripId ]
    );
  }
};
