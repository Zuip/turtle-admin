let getQuestions = require('../../integrations/cities/getQuestions');

module.exports = function(req, res) {
  return getQuestions.withLanguage(
    req.query.language
  ).then(
    response => res.json(response)
  ).catch(
    response => res.status(
      response.status
    ).json(
      response.message
    )
  );
};
