let fs = require('fs');

let config = require('../../../config');
let getFolderPath = require('../../models/articles/getFolderPath');
let getUser = require('../../integrations/users/getUser');
let getUserFolderPath = require('../../services/images/getUserFolderPath');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  getUser.withId(req.session.user.id).then(user => {

    let userFolder = getUserFolderPath(config, user);
    if(!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    let userImagesFolder = userFolder + '/images';
    if(!fs.existsSync(userImagesFolder)) {
      fs.mkdirSync(userImagesFolder);
    }
    
    let path = userImagesFolder
             + '/' + getFolderPath(req.body.path.join('/')).toLowerCase();

    if(!fs.existsSync(path)) {
      fs.mkdirSync(path);
      return res.json({ success: true });
    }

    sendFailure(409, { success: false } );
  });
};
