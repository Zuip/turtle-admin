export default function(categoryId) {
  return fetch(
    '/api/categories/' + categoryId,
    {
      method: 'DELETE',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
