export default function() {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/articles/images',
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
