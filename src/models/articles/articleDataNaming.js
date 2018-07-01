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
      id: DBNamedArticle.id,
      categoryId: DBNamedArticle.category_id,
      cityId: DBNamedArticle.city_id,
      languageId: DBNamedArticle.language_id,
      topic: DBNamedArticle.topic,
      urlName: DBNamedArticle.url_name,
      summary: DBNamedArticle.summary,
      text: DBNamedArticle.text,
      publish: {
        date: DBNamedArticle.date,
        time: DBNamedArticle.time
      },
      published: DBNamedArticle.published,
      writers: DBNamedArticle.users
    };
  }
}
