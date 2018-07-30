let insertCity = require('../../database/countries/insertCity');
let selectCountry = require('../../database/countries/selectCountry');
let user = require('../../services/permissions/userIsAllowedTo');

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
        message: "Invalid url name"
      });
    }

    selectCountry.withId(req.params.countryId).then(data => {
      insertCity(
        req.params.countryId,
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
          message: "Saving city failed"
        });
      });
    }).catch(error => {
      return res.status(404).json({
        success: false,
        message: "The country does not exist!"
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
