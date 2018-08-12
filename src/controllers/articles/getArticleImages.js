let fs = require('fs');

let config = require('../../../config');
let getFolderPath = require('../../models/articles/getFolderPath');
let getUserFolderPath = require('../../services/images/getUserFolderPath');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');

function isDirectory(path, element) {
  return fs.statSync(path + '/' + element).isDirectory();
}

module.exports = function(req, res) {

  let path = getUserFolderPath(config, req.session.user)
           + '/images/' + getFolderPath(req.query.path);
  
  let sendFailure = sendFailureToRes(res);

  if(!fs.existsSync(path)) {
    return sendFailure(404, 'No images in folder');
  }

  fs.readdir(path, function (err, elements) {
    res.json({
      folders: elements.filter(element => isDirectory(path, element)),
      images: elements.filter(element => !isDirectory(path, element))
    });
  });
};
