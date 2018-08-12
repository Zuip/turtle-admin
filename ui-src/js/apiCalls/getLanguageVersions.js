import get from './functions/get';
import promiseJSON from './functions/promiseJSON';
import pipe from '../services/pipe';

export default function(translatedIn) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/languages?language=' + translatedIn
  );
};
