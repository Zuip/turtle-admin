let db = require('./connection');

let selectLanguage = {
  withCode: function (code) {
    return db.one(`
      SELECT *
      FROM languages
      WHERE languages.code = $1
    `, [code]);
  }
};

module.exports = selectLanguage;
