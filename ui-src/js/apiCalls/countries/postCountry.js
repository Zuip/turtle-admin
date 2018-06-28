export default function(name) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/countries',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name }),
      credentials: 'same-origin'
    }
  ).then(response => {

    if(response.status === 400) {
      return Promise.reject({ invalidInput: true });
    }

    return response;

  }).then(
    response => response.json()
  );
};
