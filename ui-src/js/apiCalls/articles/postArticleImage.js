export default function(postData, folderPath) {

  let folderPathParam = '';
  if(folderPath.length > 0) {
    folderPathParam = '?path=' + folderPath.join('/');
  }

  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/articles/images' + folderPathParam,
    {
      method: 'POST',
      body: postData,
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
