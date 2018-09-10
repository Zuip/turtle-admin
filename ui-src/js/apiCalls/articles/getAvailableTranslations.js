import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(visitId) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/visits/' + visitId + '/article/translations/available'
  );
};
