import urlBase from './urlBase';

export default function(data) {
  return function(path) {
    return fetch(
      urlBase + path,
      {
        method: 'POST',
        body: data,
        credentials: 'same-origin'
      }
    );
  };
};
