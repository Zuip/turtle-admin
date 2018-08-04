let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.users.url);

module.exports = {
  withUserId(userId) {
    return get(
      '/api/users/' + userId + '/permissions'
    );
  },
  withUserIdAndTarget(userId, target) {
    return get(
      '/api/users/' + userId + '/permissions?target=' + target
    );
  }
};
