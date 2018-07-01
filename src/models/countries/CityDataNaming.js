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
      name: DBNamedArticle.name,
      countryId: DBNamedArticle.country_id,
      countryName: DBNamedArticle.country_name,
    };
  }
}
