import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(categoryId, language) {

  // Root level can't have articles
  if(categoryId === 'root') {
    return Promise.resolve([]);
  }

  return pipe(
    get,
    promiseJSON
  )(
    'api/categories/' + categoryId + '/articles?language=' + language
  );
};
