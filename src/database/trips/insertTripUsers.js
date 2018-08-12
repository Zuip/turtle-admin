let db = require('../connection');

module.exports = function(tripId, userIds) {
  return Promise.all(
    userIds.map(userId => {
      return db.none(
        `
          INSERT INTO trip_user (trip_id, user_id)
          VALUES ($1, $2)
        `,
        [ tripId, userId ]
      );
    })
  );
};
