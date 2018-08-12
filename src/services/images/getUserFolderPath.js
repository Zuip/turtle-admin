module.exports = function(config, user) {
  return config.mainSiteDirectory
  + 'public'
  + '/users/' + user.name.toLowerCase();
};