let fetch = require('node-fetch');
let handleStatus = require('./handleStatus');

module.exports = function(root) {
  return function(path, data) {
    return fetch(
      root + path,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      }
    ).then(
      response => handleStatus(response)
    ).then(
      response => response.json()
    );
  };
};
