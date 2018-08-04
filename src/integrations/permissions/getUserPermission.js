let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.users.url);

module.exports = {
  withUserIdAndTargetAndAction(userId, target, action) {
    return get(
      '/api/users/' + userId + '/permissions'
      + '?target=' + target
      + '&action=' + action
    );
  }
};
