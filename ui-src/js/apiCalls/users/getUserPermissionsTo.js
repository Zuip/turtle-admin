import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(target) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/user/permissions/' + target
  );
};