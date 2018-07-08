let formatArticleListData = require('../../models/articles/formatArticleListData');
let selectArticleLanguageVersions = require('../../database/articles/selectArticleLanguageVersions');
let selectArticles = require('../../database/articles/selectArticles');
let selectCategory = require('../../database/categories/selectCategory');
let selectLanguage = require('../../database/selectLanguage');

module.exports = function(req, res) {

  let language = req.query.language;
  if(typeof language === 'undefined') {
    return res.status(404).json({
      success: false,
      message: "Missing mandatory get parameter: language"
    });
  }

  let categoryId = getCategoryId(req);

  validateCategory(
    categoryId, language
  ).catch(function(error) {
    res.status(404).json({
      success: false,
      message: "The category does not exist!"
    });
  }).then(function() {
    return selectArticles.withCategoryIdAndLanguageCode(categoryId, language);
  }).then(function(articles) {
    return selectArticleLanguageVersions.withArticleIds(
      articles.map(article => article.id)
    ).then(articleLanguageVersions => {
      return formatArticleListData(articles, articleLanguageVersions);
    });
  }).then(function(data) {
    res.json(data);
  }).catch(function(error) {
    console.log(error);
    res.status(500).json({ result: "Internal server error in fetching articles" });
  });
}

let getCategoryId = function(req) {

  if(req.params.categoryId === "root") {
    return null;
  }

  return req.params.categoryId;
}

let validateCategory = function(categoryId, language) {

  if(categoryId === null) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  return selectCategory.withIdAndLanguage(categoryId, language);
};
