let cookieParser = require('cookie-parser');
let session = require('express-session');
var fileStore = require('session-file-store')(session);

let sessionMaxAge = 8*60*60*1000; // 8 hours

module.exports = function(app, config) {
  app.use(cookieParser());
  app.use(
    session({
      name: 'app.sid',
      secret: config.session.secret,
      resave: true,
      saveUninitialized: false,
      store: new fileStore({
        path: "./tmp/sessions/",
        useAsync: true,
        reapInterval: 5000,
        maxAge: sessionMaxAge
      }),
      cookie: {
        maxAge: sessionMaxAge,
        secure: config.production
      }
    })
  );
}
