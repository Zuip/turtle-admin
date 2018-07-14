let getUsers = require('../integrations/users/getUsers');

module.exports = function(req, res) {
  getUsers.all().then(data => {

    let users = [];

    data.map(function(user) {
      users.push({
        id: user.id,
        name: user.name,
        registered: user.registered
      });
    });

    res.json(users);

  }).catch(function(error) {
    console.log(error);
    res.status(500).json({
      success: false
    });
  });
};
