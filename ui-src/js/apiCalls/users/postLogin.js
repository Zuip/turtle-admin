import post from '../functions/post';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(username, password) {
  return pipe(
    post({
      username,
      password
    }),
    promiseJSON
  )(
    'api/login'
  );
};
