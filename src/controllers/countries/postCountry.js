let insertCountry = require('../../database/countries/insertCountry');
let user = require('../../services/permissions/getUserPermissionTo');

module.exports = function(req, res) {

  user(req.session.user.id).isAllowedTo('create').target('cities').then(() => {

    if(!validName(req.body.name)) {
      return res.status(400).json({
        success: false,
        message: "Invalid country name"
      });
    }

    if(!validName(req.body.urlName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid country url name"
      });
    }

    insertCountry(
      req.body.name,
      req.body.urlName
    ).then(data => {
      return res.json({
        success: true
      });
    }).catch(error => {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Saving country failed"
      });
    });
  }).catch(() => {
    return res.status(401).json({});
  });
};

function validName(name) {

  if(typeof name !== 'string') {
    return false;
  }

  return name !== '';
}
