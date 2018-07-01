import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(articleId, language) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/articles/' + articleId + '?language=' + language
  );
};
