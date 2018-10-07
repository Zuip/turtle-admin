import get from '../functions/get';
import promiseJSON from '../functions/promiseJSON';
import pipe from '../../services/pipe';

export default function(cityId, language) {

  let url = 'api/cities/' + cityId;

  if(typeof language !== 'undefined') {
    url += '?language=' + language;
  }

  return pipe(
    get,
    promiseJSON
  )(
    url
  );
};
