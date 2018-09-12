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

    let path = userImagesFolder + '/' + getFolderPath(req.query.path);

    if(!req.files) {
      return sendFailure(400, 'No files were uploaded.');
    }

    if(!fs.existsSync(path)) {
      return sendFailure(404, 'Folder does not exist');
    }

    let articleImage = req.files.articleImage;

    articleImage.mv(path + '/' + articleImage.name, function(error) {

      if(error) {
        return sendFailure(500, error);
      }

      return res.json({ success: true });
    });
  });
};
