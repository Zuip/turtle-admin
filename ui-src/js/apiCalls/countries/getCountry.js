import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(countryId, language) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/countries/' + countryId + '?language=' + language
  );
};
