export default function(categoryId, language) {
  return fetch(
    '/api/categories/' + categoryId + '/categories?language=' + language,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
