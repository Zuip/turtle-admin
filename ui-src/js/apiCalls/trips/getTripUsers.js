import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(tripId) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/trips/' + tripId + '/users'
  );
};
