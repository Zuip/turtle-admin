import put from '../functions/put';
import promiseJSON from '../functions/promiseJSON';
import rejectHttpStatus400 from '../functions/rejectHttpStatus400';
import pipe from '../../services/pipe';

export default function(tripId, rankedCityIds) {
  return pipe(
    put(rankedCityIds),
    rejectHttpStatus400,
    promiseJSON
  )(
    'api/trips/' + tripId + '/cities/comparisons'
  );
};
