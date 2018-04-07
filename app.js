let express = require('express');
let session = require('express-session');
let path = require("path");
let bodyParser = require("body-parser");
let config = require('./config');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow reading files from public folder
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(
  session(
    {
      secret: config.session.secret,
      resave: true,
      saveUninitialized: true
    }
  )
);

// Start listening to calls
app.listen(3000, () => console.log('Zui.fi Admin listening on port 3000!'));

// The frontend
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// API

app.post('/login', function(req, res) {
  if(req.body.username === 'Zui') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.use(function(req, res, next) {

  if(req.session.user === null) {
    return res.status(401).json({
      success: false,
      message: 'User not logged in!'
    });
  }

  return next();
});

app.get('/user', function(req, res) {
  res.json({ result: req.session.user });
});
