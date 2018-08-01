let db = require('./connection');

module.exports = {
  all() {
    return db.any(`
      SELECT *
      FROM language
    `);
  },
  withCodes(languageCodes) {
    return db.any(
      `
        SELECT *
        FROM language
        WHERE language.code IN ($1:csv)
      `,
      [
        languageCodes
      ]
    );
  }
};
