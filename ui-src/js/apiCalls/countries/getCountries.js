export default function(language) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/countries?language=' + language,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
