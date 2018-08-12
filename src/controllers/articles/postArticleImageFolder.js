let fs = require('fs');

let config = require('../../../config');
let getFolderPath = require('../../models/articles/getFolderPath');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);
  
  let path = config.mainSiteDirectory + 'public/articles/images/' + getFolderPath(req.body.path.join('/'));

  if(!fs.existsSync(path)) {
    fs.mkdirSync(path);
    return res.json({ success: true });
  }

  sendFailure(409, { success: false } );
};
