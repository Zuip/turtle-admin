export default function(folderPath) {

  let folderPathParam = '';
  if(folderPath.length > 0) {
    folderPathParam = '?path=' + folderPath.join('/');
  }

  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/articles/images' + folderPathParam,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
