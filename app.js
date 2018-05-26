let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let history = require('express-history-api-fallback');
let config = require('./config');
let index = require('./src/index');

let app = express();

let root = __dirname + '/public';

// This makes it easier to handle posted JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start listening to calls
app.listen(3000, () => console.log('Zui.fi Admin listening on port 3000!'));

// Session
require('./src/session')(app, config);

// The frontend
app.get('/', index);

// Allow reading files from public folder
app.use(express.static(root));

// Api routes
require('./src/routes/routes')(app);

// Fall back to vue if path is not found in server. This is for nicer urls.
app.use(history('index.html', { root: root }));
