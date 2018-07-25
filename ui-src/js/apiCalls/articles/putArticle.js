import put from '../functions/put';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(visitId, language, data) {
  return pipe(
    put(data),
    promiseJSON
  )(
    'api/visits/' + visitId + '/article?language=' + language
  );
};
