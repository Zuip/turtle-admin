let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.users.url);

module.exports = {
  all() {
    return get(
      '/api/users'
    ).then(
      data => data.json()
    );
  },
  withUserIds(userIds) {

    if(userIds.length === 0) {
      return [];
    }

    return get(
      '/api/users?ids=' + userIds.join(',')
    ).then(
      data => data.json()
    );
  }
};
