import postRaw from '../functions/postRaw';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(data, folderPath) {
  return pipe(
    postRaw(data),
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
