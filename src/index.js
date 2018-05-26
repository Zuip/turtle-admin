let config = require('../config');
let fs = require('fs');

module.exports = function(req, res) {
  fs.readFile('./index.html', 'utf8', function(error, html) {

    if(error) {
      return console.log(error);
    }

    html = html.replace(/{{rootPath}}/g, config.basePath);

    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      'Expires': new Date().toUTCString()
    });

    res.end(html);
  });
};
