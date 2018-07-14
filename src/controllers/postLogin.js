let getUser = require('../integrations/users/getUser');

module.exports = function(req, res) {

  getUser.withUsernameAndPassword(
    req.body.username,
    req.body.password
  ).then(function(user) {

    req.session.user = user;

    res.json({
      username: user.name,
      success: true
    });

  }).catch(function(error) {

    if(error.code === 404) {
      return res.status(401).json({
        success: false
      });
    }

    res.status(500).json({ success: false, error });
  });
};
