export default function(countryId, name) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/countries/' + countryId + '/cities',
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
