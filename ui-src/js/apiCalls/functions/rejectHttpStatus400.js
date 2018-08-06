export default function(promise) {
  return promise.then(response => {

    if(response.status === 400) {
      return response.json().then(
        data => Promise.reject({
          invalidInput: true,
          failedFields: data.failedFields
        })
      );
    }

    return response;
  });
};
