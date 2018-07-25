let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function(name, urlName) {
  return Promise.all([
    insertCountryBase().then(country => country.country_id),
    selectLanguages.all()
  ]).then(data => {
    createTranslatedCountries(name, urlName, data[0], data[1]);
  });
};

function createTranslatedCountries(name, urlName, countryId, languages) {
  languages.map(language => {
    insertTranslatedCountry(countryId, name, urlName, language.id);
  });
}

function insertCountryBase() {
  return db.one(`
    INSERT INTO country DEFAULT VALUES
    RETURNING id AS country_id
  `);
}

function insertTranslatedCountry(countryId, name, urlName, languageId) {
  db.none(
    `
      INSERT INTO translated_country (country_id, name, url_name, language_id)
      VALUES ($1, $2, $3, $4)
    `,
    [countryId, name, urlName, languageId]
  );
}
