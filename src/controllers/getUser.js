let getUser = require('../integrations/users/getUser');

module.exports = function(req, res) {

  if(typeof req.session.user === 'undefined') {
    return res.json({ user: null });
  }

  getUser.withId(
    req.session.user.id
  ).then(
    user => res.json({
      user: {
        name: user.name
      }
    })
  );
};
