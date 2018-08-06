module.exports = function(res) {
  return function(statusCode, message) {

    if(typeof statusCode === 'undefined') {
      res.status(500).json({ message: 'Unexcepted error' });
    }

    res.status(statusCode).json(message);
    return Promise.reject();
  };
};