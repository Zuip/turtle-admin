let GetCreator = require('../crudCreators/GetCreator');
let config = require('../../../config');
let get = GetCreator(config.integrations.users.url);

module.exports = {
  withId(id) {
    return get(
      '/api/users/' + id
    );
  }
};
