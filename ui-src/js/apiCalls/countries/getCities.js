import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(language) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/cities?language=' + language
  );
};
