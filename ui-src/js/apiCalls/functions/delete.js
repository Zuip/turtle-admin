import urlBase from './urlBase';

export default function(path) {
  return fetch(
    urlBase + path,
    {
      method: 'DELETE',
      credentials: 'same-origin'
    }
  );
};
