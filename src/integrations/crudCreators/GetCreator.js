let fetch = require('node-fetch');

module.exports = function(root) {
  return function(path) {
    return fetch(
      root + path,
      { method: 'GET' }
    );
  }
};
