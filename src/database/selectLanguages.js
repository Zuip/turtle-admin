let db = require('./connection');

let selectLanguages = {
  all: function () {
    return db.any(`
      SELECT *
      FROM languages
    `);
  }
};

module.exports = selectLanguages;
