module.exports = function(urlName) {

  if(typeof urlName !== 'string') {
    return false;
  }

  if(urlName.length === 0) {
    return false;
  }
  
  return (/[a-z_-]/.test(urlName));
};