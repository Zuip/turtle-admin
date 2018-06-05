let fs = require('fs');

module.exports = function(req, res) {

  let path = './public/articles/images/' + req.body.path.join('/');

  if(!fs.existsSync(path)) {
    fs.mkdirSync(path);
    return res.json({ success: true });
  }

  res.status(409).json({ success: false });
};
