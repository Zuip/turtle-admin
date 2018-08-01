let getUsers = require('../../integrations/users/getUsers');
let selectTripUsers = require('../../database/trips/selectTripUsers');

module.exports = function(req, res) {
  selectTripUsers.withTripId(
    req.params.tripId
  ).then(tripUsers => {
    return getUsers.withUserIds(
      tripUsers.map(
        tripUser => tripUser.user_id
      )
    );
  }).then(tripUsers => {

    let users = [];

    tripUsers.map(function(user) {
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
      success: false,
      error
    });
  });
};
