let db = require('./src/database/connection');
let passwordHandler = require('./src/models/users/password');

let prompt = require('prompt');

prompt.start();

prompt.get(['username', 'password'], function (err, result) {

  if(result.username.length < 3) {
    console.log('Too short username!');
    return;
  }

  if(result.password.length < 7) {
    console.log('Too short password!');
    return;
  }

  passwordHandler.generateHash(result.password, function(hashedPassword) {

    db.none(
      `
        INSERT INTO user_account (name, password)
        VALUES ($1, $2)
      `,
      [result.username, hashedPassword]
    );

    console.log('User was created!');
  });
});
