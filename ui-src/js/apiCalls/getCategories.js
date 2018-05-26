export default function(categoryId, language) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/categories/' + categoryId + '/categories?language=' + language,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
