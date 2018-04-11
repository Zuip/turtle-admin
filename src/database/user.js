let db = require('./connection');

let user = {
  getWithUsername: function (username) {
    return db.one(
      'SELECT * FROM user_accounts WHERE lower(name) = $1',
      username.toLowerCase()
    );
  }
};

module.exports = user;
