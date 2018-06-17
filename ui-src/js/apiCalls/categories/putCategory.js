export default function(categoryId, putData) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/categories/' + categoryId + '?language=fi',
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(putData),
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
