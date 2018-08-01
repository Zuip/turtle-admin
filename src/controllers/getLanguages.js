let selectLanguages = require('../database/selectLanguages');

module.exports = function(req, res) {
  selectLanguages.all().then(function(languages) {
    res.json(languages);
  }).catch(
    error => error.log(error)
  );
};
