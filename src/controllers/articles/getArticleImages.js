let fs = require('fs');
let basePath = './public/articles/images';

module.exports = function(req, res) {

  let path = basePath;

  function isDirectory(element) {
    return fs.statSync(path + '/' + element).isDirectory();
  }

  fs.readdir(path, function (err, elements) {
    res.json({
      folders: elements.filter(element => isDirectory(element)),
      images: elements.filter(element => !isDirectory(element))
    });
  });
}
