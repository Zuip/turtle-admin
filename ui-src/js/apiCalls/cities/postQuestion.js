import post from '../functions/post';
import promiseJSON from '../functions/promiseJSON';
import rejectHttpStatus400 from '../functions/rejectHttpStatus400';
import pipe from '../../services/pipe';

export default function(data) {
  return pipe(
    post(data),
    rejectHttpStatus400,
    promiseJSON
  )(
    'api/cities/questions'
  );
};
