let redis = require('redis');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);

module.exports = function(app, config) {

  let redisClient = redis.createClient(
    config.redis.port,
    config.redis.host
  );

  redisClient.auth(config.redis.secret);

  app.use(session({
    cookie: {
      secure: config.production,
      maxAge: 86400000
    },
    secret: config.cookie.secret,
    store: new RedisStore({
      host: config.redis.host,
      port: config.redis.port,
      client: redisClient,
      ttl: 260
    }),
    saveUninitialized: false,
    resave: false
  }));

  redisClient.on('error', function(err) {
    console.log('Redis error: ' + err);
  });
};
