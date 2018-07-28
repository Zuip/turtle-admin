let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.users.url);

module.exports = {
  withId(id) {
    return get(
      '/api/users/' + id
    ).then(
      response => response.json()
    );
  },
  withUsernameAndPassword(username, password) {

    return get(
      '/api/users?username=' + username + '&password=' + password
    ).then(response => {

      if(response.status === 404 || response.status === 500) {
        return Promise.reject({ code: response.status });
      }

      return response;

    }).then(
      response => response.json()
    );
  }
};
