let APINamedArticle = null;
let DBNamedArticle = null;

module.exports = {
  getAPINamed() {
    return APINamedArticle;
  },
  setDBNamed(DBNamed) {
    DBNamedArticle = DBNamed;
  },
  transformDBToAPINamed() {

    if(DBNamedArticle === null) {
      return null;
    }

    APINamedArticle = {
      id: DBNamedArticle.article_id,
      language: DBNamedArticle.article_language,
      languages: DBNamedArticle.languages,
      summary: DBNamedArticle.article_summary,
      text: DBNamedArticle.article_text,
      published: DBNamedArticle.article_published
    };
  }
};
