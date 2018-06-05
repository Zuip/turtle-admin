export default function(articleId, language, putData) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/articles/' + articleId + '?language=' + language,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(putData),
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
