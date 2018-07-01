import deleteCall from '../functions/delete';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(categoryId) {
  return pipe(
    deleteCall,
    promiseJSON
  )(
    'api/categories/' + categoryId
  );
};
