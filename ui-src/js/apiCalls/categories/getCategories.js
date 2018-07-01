import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(categoryId, language) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/categories/' + categoryId + '/categories?language=' + language
  );
};
