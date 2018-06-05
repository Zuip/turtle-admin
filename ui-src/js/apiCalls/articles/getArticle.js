export default function(articleId, language) {
  return fetch(
    document.getElementsByTagName('base')[0].href + 'api/articles/' + articleId + '?language=' + language,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
