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
  }
};
