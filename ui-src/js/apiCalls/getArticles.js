export default function(categoryId, language) {

  // Root level can't have articles
  if(categoryId === 'root') {
    return Promise.resolve([]);
  }

  return fetch(
    '/api/categories/' + categoryId + '/articles?language=' + language,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
