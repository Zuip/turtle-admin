let fs = require('fs');
let getFolderPath = require('../../models/articles/getFolderPath');

module.exports = function(req, res) {

  let path = './public/articles/images/' + getFolderPath(req.query.path);

  if(!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  if(!fs.existsSync(path)) {
    res.status(404).json({ success: false });
  }

  let articleImage = req.files.articleImage;

  articleImage.mv(path + '/' + articleImage.name, function(error) {

    if(error) {
      return res.status(500).send(error);
    }

    return res.json({ success: true });
  });
};
