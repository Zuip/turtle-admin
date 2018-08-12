let getLanguages = require('../integrations/languages/getLanguages');

module.exports = function(req, res) {
  return getLanguages.translatedIn(
    req.query.language
  ).then(languages => {
    res.json(languages);
  }).catch(
    error => res.status(
      error.status
    ).json(
      error.message
    )
  );
};
