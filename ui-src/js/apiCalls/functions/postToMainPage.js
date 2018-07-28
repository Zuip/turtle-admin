export default function(data) {
  return function(path) {
    return fetch(
      path,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'same-origin'
      }
    );
  };
};
