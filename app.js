let express = require('express');
let session = require('express-session');
let path = require("path");
let bodyParser = require("body-parser");
var history = require('express-history-api-fallback');
let config = require('./config');

let app = express();

let root = __dirname + '/public';

// This makes it easier to handle posted JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow reading files from public folder
app.use(express.static(root));

// Initialize sessionS
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

// Api routes
require('./src/routes/routes')(app);

// Fall back to vue if path is not found in server. This is for nicer urls.
app.use(history('index.html', { root: root }));
