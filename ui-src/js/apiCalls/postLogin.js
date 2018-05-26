export default function(username, password) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/login',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
