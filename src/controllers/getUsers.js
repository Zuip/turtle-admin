let selectUsers = require('../database/selectUsers');

module.exports = function(req, res) {
  selectUsers.all().then(function(data) {

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
