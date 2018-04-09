let express = require('express');
let session = require('express-session');
let path = require("path");
let bodyParser = require("body-parser");
let config = require('./config');

// Middlewares
let authenticatedMiddleware = require('./src/middlewares/authenticated');

// Controllers
let postLoginController = require('./src/controllers/postLogin');

let app = express();

// This makes it easier to handle posted JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow reading files from public folder
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true
  })
);

// Start listening to calls
app.listen(3000, () => console.log('Zui.fi Admin listening on port 3000!'));

// The frontend
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// API

app.post('/login', postLoginController);

app.use(authenticatedMiddleware);

app.get('/user', function(req, res) {
  res.json({ result: req.session.user });
});
