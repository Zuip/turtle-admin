let articleDataNaming = require('../../models/articles/articleDataNaming');
let filterObjectProperties = require('../../models/helpers/filterObjectProperties');

module.exports = function(articles, articleLanguageVersions) {

  articles.map(article => {
    article.languages = articleLanguageVersions.filter(
      languageVersion => languageVersion.article_id === article.id
    );
  });

  articles.map(article => {
    article.languages = article.languages.map(language => {
      return filterObjectProperties(
        language,
        ['code', 'published']
      );
    });
  });

  return articles.map(article => {

    articleDataNaming.setDBNamed(article);
    articleDataNaming.transformDBToAPINamed();

    return filterObjectProperties(
      articleDataNaming.getAPINamed(),
      ['id', 'topic', 'languages']
    );
  });
}
