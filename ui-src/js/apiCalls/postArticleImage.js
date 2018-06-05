export default function(postData) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/articles/images',
    {
      method: 'POST',
      body: postData,
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
