export default function(articleId, language) {
  return fetch(
    '/api/articles/' + articleId + '?language=' + language,
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then(
    data => data.json()
  );
};
