let fs = require('fs');
let getFolderPath = require('../../models/articles/getFolderPath');
let config = require('../../../config');

module.exports = function(req, res) {

  let path = config.mainSiteDirectory + 'public/articles/images/' + getFolderPath(req.body.path.join('/'));

  if(!fs.existsSync(path)) {
    fs.mkdirSync(path);
    return res.json({ success: true });
  }

  res.status(409).json({ success: false });
};
