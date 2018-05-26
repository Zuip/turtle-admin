export default function(postData) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/articles',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData),
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
