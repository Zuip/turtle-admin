export default function(promise) {
  return promise.then(response => {

    if(response.status === 400) {
      return Promise.reject({
        invalidInput: true
      });
    }

    return response;
  });
};
