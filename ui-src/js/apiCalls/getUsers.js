export default function() {
  return fetch(
    '/api/users',
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
