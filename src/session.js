let cookie = require('cookie');
let laravelSession = require('node-laravel-session');
let redis   = require('redis');

module.exports = function(app, config) {
  app.use(function(req, res, next) {
    getSessionKey(
      config,
      req
    ).then(
      sessionKey => laravelSession.getSessionFromRedis(
        sessionKey,
        getClient(config),
        'laravel'
      )
    ).then(
      session => initializeReqSession(session, req)
    ).catch(error => {
      console.log(error);
    }).then(() => {
      next();
    });
  });
};

function getClient(config) {
  return redis.createClient({
    host: 'localhost',
    port: 6379,
    password: config.session.secret
  });
}

function initializeReqSession(session, req) {

  if(typeof session.userId === 'undefined') {
    req.session = {};
    return;
  }

  req.session = {
    user: {
      id: session.userId
    }
  };
}

function getSessionKey(config, req) {

  return laravelSession.getAppKey(
    config.mainSiteDirectory + '.env'
  ).then(appKey => {

    let session = cookie.parse(
      req.headers.cookie
    ).laravel_session;

    return laravelSession.getSessionKey(
      session,
      appKey
    );
  });
}
