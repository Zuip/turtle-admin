let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.users.url);

module.exports = {
  withUserId(userId) {
    return get(
      '/api/users/' + userId + '/permissions'
    ).then(
      response => response.json()
    );
  },
  withUserIdAndTarget(userId, target) {
    return get(
      '/api/users/' + userId + '/permissions?target=' + target
    ).then(
      response => response.json()
    );
  }
};
