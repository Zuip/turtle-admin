export default function(countryId, language) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/countries/' + countryId + '/cities?language=' + language,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
