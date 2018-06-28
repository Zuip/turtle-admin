let selectCountries = require('../../database/countries/selectCountries');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  selectCountries.withLanguage(
    language
  ).then(countries => {
    res.json(countries);
  }).catch(error => {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "There was an error in selecting countries from database"
    });
  });
};
