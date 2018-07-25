let insertCountry = require('../../database/countries/insertCountry');

module.exports = function(req, res) {

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
};

function validName(name) {

  if(typeof name !== 'string') {
    return false;
  }

  return name !== '';
}
