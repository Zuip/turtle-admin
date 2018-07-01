import urlBase from './urlBase';

export default function(path) {
  return fetch(
    urlBase + path,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  );
};
