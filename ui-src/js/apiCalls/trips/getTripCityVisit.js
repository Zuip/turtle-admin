import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(visitId, language) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/visits/' + visitId + '?language=' + language
  );
};
