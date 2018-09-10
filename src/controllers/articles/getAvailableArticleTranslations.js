let getLanguages = require('../../integrations/languages/getLanguages');
let selectArticleLanguageVersions = require('../../database/articles/selectArticleLanguageVersions');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  Promise.resolve().then(() => {
    return Promise.all([
      getLanguages.all(),
      selectArticleLanguageVersions.withVisitId(
        req.params.visitId
      )
    ]).then(data => {

      let existingLanguageVersions = data[1].map(
        articleLanguageVersion => articleLanguageVersion.article_language
      );

      return data[0].filter(
        language => !existingLanguageVersions.includes(language)
      );

    }).catch(
      () => sendFailure(500, 'Error in selecting article language versions!')
    );
  }).then(
    languages => res.json(languages)
  ).catch(() => {
    // Promise chain ended 
  });
};
