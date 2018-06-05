let express = require('express');
let fileUpload = require('express-fileupload');
let path = require('path');
let bodyParser = require('body-parser');
let config = require('./config');
let index = require('./src/index');

let app = express();

let root = __dirname + '/public';

// This makes it easier to handle posted JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable file upload
app.use(fileUpload());

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

// Redirect to index for all other routes so that Vue can handle rest of the routing
app.get('*', index);
