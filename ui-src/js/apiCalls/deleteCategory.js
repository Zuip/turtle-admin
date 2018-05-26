export default function(categoryId) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/categories/' + categoryId,
    {
      method: 'DELETE',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
