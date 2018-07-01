import pipe from '../pipe';

export default function(citiesByCountry) {
  return pipe(
    formatCountries,
    addNullToBeginning
  )(
    citiesByCountry
  );
};

function formatCountries(citiesByCountry) {
  return citiesByCountry.map(country => {
    return {
      value: formatCities(country.cities),
      translation: country.name
    };
  });
}

function formatCities(cities) {
  return cities.map(city => {
    return {
      value: city.id,
      translation: city.name
    };
  });
}

function addNullToBeginning(citiesByCountry) {
  citiesByCountry.unshift(null);
  return citiesByCountry;
}
