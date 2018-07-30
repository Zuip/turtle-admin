let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.users.url);

module.exports = {
  withUserIdAndTargetAndAction(userId, target, action) {
    return get(
      '/api/users/' + userId + '/permissions'
      + '?target=' + target
      + '&action=' + action
    ).then(response => {

      if(response.status === 404) {
        return Promise.reject(404);
      }

      return response;
      
    }).then(
      response => response.json()
    );
  }
};
