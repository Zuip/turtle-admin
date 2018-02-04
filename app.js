let express = require('express');
let app = express();
let path = require("path");

// Allow reading files from public folder
app.use('/', express.static(path.join(__dirname, 'public')));

// The frontend
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// API


// Start listening to calls
app.listen(3000, () => console.log('Zui.fi Admin listening on port 3000!'));
