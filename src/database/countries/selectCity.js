let db = require('../connection');

module.exports = {
  withId(id) {
    return db.one(
      `
        SELECT city.id
        FROM city
        WHERE city.id = $1
      `,
      [ id ]
    );
  }
};
