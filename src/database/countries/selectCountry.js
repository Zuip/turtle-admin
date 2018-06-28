let db = require('../connection');

module.exports = {
  withId(id) {
    return db.one(
      `
        SELECT country.id
        FROM country
        WHERE country.id = $1
      `,
      [ id ]
    );
  },
  withIdAndLanguage(id, language) {
    return db.one(
      `
        SELECT country.id, translated_country.name
        FROM country
        JOIN translated_country ON translated_country.country_id = country.id
        JOIN language ON language.id = translated_country.language_id
        WHERE country.id = $1
        AND language.code = $2
      `,
      [ id, language ]
    );
  }
};
