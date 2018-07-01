import put from '../functions/put';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(categoryId, data) {
  return pipe(
    put(data),
    promiseJSON
  )(
    'api/categories/' + categoryId + '?language=fi'
  );
};
