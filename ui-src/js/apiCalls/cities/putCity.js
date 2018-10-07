import put from '../functions/put';
import promiseJSON from '../functions/promiseJSON';
import rejectHttpStatus400 from '../functions/rejectHttpStatus400';
import pipe from '../../services/pipe';

export default function(cityId, data) {
  return pipe(
    put(data),
    rejectHttpStatus400,
    promiseJSON
  )(
    'api/cities/' + cityId
  );
};
