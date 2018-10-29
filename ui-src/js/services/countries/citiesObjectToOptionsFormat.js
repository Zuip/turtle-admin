import pipe from '../pipe';
import nameSort from '../nameSort';

export default function(citiesByCountry) {
  return pipe(
    sortByName,
    formatCountries,
    addNullToBeginning
  )(
    citiesByCountry
  );
};

function addNullToBeginning(citiesByCountry) {
  citiesByCountry.unshift(null);
  return citiesByCountry;
}

function formatCities(cities) {
  return cities.map(city => {
    return {
      value: city.id,
      translation: city.name
    };
  });
}

function formatCountries(citiesByCountry) {
  return citiesByCountry.map(country => {
    return {
      value: formatCities(country.cities),
      translation: country.name
    };
  });
}

function sortByName(citiesByCountry) {
  return citiesByCountry.map(
    country => {

      country.cities.sort(
        nameSort
      );

      return country;
    }
  ).sort(nameSort);
}
