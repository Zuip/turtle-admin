let authenticated = function(req, res, next) {

  if(!req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'User not logged in!'
    });
  }

  return next();
};

module.exports = authenticated;
