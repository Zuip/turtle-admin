let db = require('../connection');

module.exports = function(tripId, cityId, visitStart, visitEnd, userIds) {
  return createCityVisit(tripId, cityId, visitStart, visitEnd).then(cityVisit => {
    return Promise.all(userIds.map(userId => createCityVisitUser(userId, cityVisit.id)));
  });
};

function createCityVisit(tripId, cityId, visitStart, visitEnd) {
  return db.one(
    `
      INSERT INTO city_visit (
        trip_id,
        city_id,
        visit_start_year,
        visit_start_month,
        visit_start_day,
        visit_end_year,
        visit_end_month,
        visit_end_day
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      )
      RETURNING city_visit.id AS id
    `,
    [
      tripId,
      cityId,
      visitStart.year,
      visitStart.month,
      visitStart.day,
      visitEnd.year,
      visitEnd.month,
      visitEnd.day
    ]
  );
}

function createCityVisitUser(userId, cityVisitId) {
  return db.none(
    `
      INSERT INTO city_visit_user (
        user_id,
        city_visit_id
      ) VALUES (
        $1,
        $2
      )
    `,
    [
      userId,
      cityVisitId
    ]
  );
}