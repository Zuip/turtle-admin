let getUserController = function(req, res) {

  if(typeof req.session.user === 'undefined') {
    res.json({ user: null });
  } else {
    res.json({ user: { name: req.session.user.name }});
  }

};

module.exports = getUserController;
