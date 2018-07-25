import post from '../functions/post';
import promiseJSON from '../functions/promiseJSON';
import rejectHttpStatus400 from '../functions/rejectHttpStatus400';
import pipe from '../../services/pipe';

export default function(trip, language) {
  return pipe(
    post(trip),
    rejectHttpStatus400,
    promiseJSON
  )(
    'api/trips?language=' + language
  );
};
