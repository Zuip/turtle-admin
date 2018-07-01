let db = require('../connection');

module.exports = {
  withCountryIdAndLanguage(countryId, language) {
    return db.any(
      `
        SELECT city.id, country.id AS country_id, translated_city.name
        FROM country
        JOIN city ON city.country_id = country.id
        JOIN translated_city ON translated_city.city_id = city.id
        JOIN language ON language.id = translated_city.language_id
        WHERE country.id = $1
        AND language.code = $2
      `,
      [ countryId, language ]
    );
  },
  withLanguage(language) {
    return db.any(
      `
        SELECT city.id,
               country.id AS country_id,
               translated_city.name,
               translated_country.name AS country_name
        FROM country
        JOIN city ON city.country_id = country.id
        JOIN translated_country ON translated_country.country_id = country.id
        JOIN translated_city ON translated_city.city_id = city.id
        JOIN language ON (
          language.id = translated_city.language_id
          AND language.id = translated_country.language_id
        )
        WHERE language.code = $1
      `,
      [ language ]
    );
  }
};
