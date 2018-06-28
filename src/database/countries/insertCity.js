let db = require('../connection');
let selectLanguages = require('../selectLanguages');

module.exports = function(countryId, name) {
  return Promise.all([
    insertCityBase(countryId).then(city => city.city_id),
    selectLanguages.all()
  ]).then(data => {
    createTranslatedCities(name, data[0], data[1]);
  });
};

function createTranslatedCities(name, cityId, languages) {
  languages.map(language => {
    insertTranslatedCity(cityId, name, language.id);
  });
}

function insertCityBase(countryId) {
  return db.one(
    `
      INSERT INTO city (country_id) VALUES ($1)
      RETURNING id AS city_id
    `,
    [countryId]
  );
}

function insertTranslatedCity(cityId, name, languageId) {
  db.none(
    `
      INSERT INTO translated_city (city_id, name, language_id)
      VALUES ($1, $2, $3)
    `,
    [cityId, name, languageId]
  );
}
