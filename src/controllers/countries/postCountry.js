let insertCountry = require('../../database/countries/insertCountry');

module.exports = function(req, res) {

  if(!validCountryName(req.body.name)) {
    return res.status(400).json({
      success: false,
      message: "Invalid country name"
    });
  }

  insertCountry(req.body.name).then(data => {
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

function validCountryName(name) {

  if(typeof name !== 'string') {
    return false;
  }

  return name !== '';
}
