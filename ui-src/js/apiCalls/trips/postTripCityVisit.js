import post from '../functions/post';
import promiseJSON from '../functions/promiseJSON';
import rejectHttpStatus400 from '../functions/rejectHttpStatus400';
import pipe from '../../services/pipe';

export default function(tripId, visitData) {
  return pipe(
    post(visitData),
    rejectHttpStatus400,
    promiseJSON
  )(
    'api/trips/' + tripId + '/visits'
  );
};
