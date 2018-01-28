let express = require('express');
let app = express();
let path = require("path");

// The frontend
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/main.html'))
);

// API


// Start listening to calls
app.listen(3000, () => console.log('Zui.fi Admin listening on port 3000!'));
