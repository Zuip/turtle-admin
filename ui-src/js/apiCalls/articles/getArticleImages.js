import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(folderPath) {
  return pipe(
    get,
    promiseJSON
  )(
    'api/articles/images' + getFolderPathParam(folderPath)
  );
};

function getFolderPathParam(folderPath) {

  if(folderPath.length === 0) {
    return '';
  }

  return '?path=' + folderPath.join('/');
}
