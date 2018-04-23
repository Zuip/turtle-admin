let db = require('./connection');

let selectLanguage = {
  withCode: function (code) {
    return db.one(`
      SELECT *
      FROM language
      WHERE language.code = $1
    `, [code]);
  }
};

module.exports = selectLanguage;
