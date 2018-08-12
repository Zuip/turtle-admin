let getUsers = require('../../integrations/users/getUsers');
let selectTripUsers = require('../../database/trips/selectTripUsers');
let sendFailureToRes = require('../../services/routing/sendFailureToRes');

module.exports = function(req, res) {

  let sendFailure = sendFailureToRes(res);

  selectTripUsers.withTripId(
    req.params.tripId
  ).then(
    tripUsers => getUsers.withUserIds(
      tripUsers.map(
        tripUser => tripUser.user_id
      )
    )
  ).then(tripUsers => {

    let users = [];

    tripUsers.map(function(user) {
      users.push({
        id: user.id,
        name: user.name,
        registered: user.registered
      });
    });

    res.json(users);

  }).catch(
    () => sendFailure(500).json({})
  );
};
