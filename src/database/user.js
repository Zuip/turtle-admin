let db = require('./connection');

module.exports = {
  getWithUsername: function (username) {
    return db.one(
      'SELECT * FROM user_account WHERE lower(name) = $1',
      username.toLowerCase()
    );
  }
};
