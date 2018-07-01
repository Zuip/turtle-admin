import post from '../functions/post';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(data) {
  return pipe(
    post(data),
    promiseJSON
  )(
    'api/categories'
  );
};
