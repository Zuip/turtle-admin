let getLogoutController = function(req, res) {

  req.session.destroy();
  res.json({ success: true });

};

module.exports = getLogoutController;
