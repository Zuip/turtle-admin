let getQuestion = require('../../integrations/cities/getQuestion');

module.exports = function(req, res) {
  return getQuestion.withIdAndLanguage(
    req.params.questionId,
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
