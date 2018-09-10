import post from '../functions/post';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(visitId, language, data) {
  return pipe(
    post(data),
    promiseJSON
  )(
    'api/visits/' + visitId
    + '/article/translations'
    + '?language=' + language
  );
};
