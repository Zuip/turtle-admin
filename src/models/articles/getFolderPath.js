module.exports = function(path) {

  if(typeof path === 'undefined') {
    return '';
  }

  let pathArray = path.split('/');

  return pathArray.filter(function(folder) {
    return folder.match("^[a-zA-Z0-9_-]+$");
  }).join('/');
};
