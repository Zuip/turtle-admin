let db = require('./connection');

let languageFetcher = {
  getLanguages: function () {
    return db.any('SELECT * FROM languages');
  }
};

module.exports = languageFetcher;
