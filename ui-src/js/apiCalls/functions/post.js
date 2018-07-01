import urlBase from './urlBase';

export default function(data) {
  return function(path) {
    return fetch(
      urlBase + path,
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
