export default function(promise) {
  return promise.then(
    data => data.json()
  );
};
