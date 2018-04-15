export default function(postData) {
  return fetch(
    '/api/categories',
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