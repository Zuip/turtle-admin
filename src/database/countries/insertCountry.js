let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function(name) {
  return Promise.all([
    insertCountryBase().then(country => country.country_id),
    selectLanguages.all()
  ]).then(data => {
    createTranslatedCountries(name, data[0], data[1]);
  });
}

function createTranslatedCountries(name, countryId, languages) {
  languages.map(language => {
    insertTranslatedCountry(countryId, name, language.id);
  });
}

function insertCountryBase() {
  return db.one(`
    INSERT INTO country DEFAULT VALUES
    RETURNING id AS country_id
  `);
}

function insertTranslatedCountry(countryId, name, languageId) {
  db.none(
    `
      INSERT INTO translated_country (country_id, name, language_id)
      VALUES ($1, $2, $3)
    `,
    [countryId, name, languageId]
  );
}
