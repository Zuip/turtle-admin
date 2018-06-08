let fs = require('fs');
let getFolderPath = require('../../models/articles/getFolderPath');
let config = require('../../../config');

let basePath = config.mainSiteDirectory + 'public/articles/images';

function isDirectory(path, element) {
  return fs.statSync(path + '/' + element).isDirectory();
}

module.exports = function(req, res) {

  let path = basePath + '/' + getFolderPath(req.query.path);

  if(!fs.existsSync(path)) {
    res.status(404).json({ success: false });
  }

  fs.readdir(path, function (err, elements) {
    res.json({
      folders: elements.filter(element => isDirectory(path, element)),
      images: elements.filter(element => !isDirectory(path, element))
    });
  });
}
