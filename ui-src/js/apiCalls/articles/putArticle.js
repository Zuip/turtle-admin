import put from '../functions/put';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(articleId, language, data) {
  return pipe(
    put(data),
    promiseJSON
  )(
    'api/articles/' + articleId + '?language=' + language
  );
};
