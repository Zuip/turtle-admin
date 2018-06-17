export default function(categoryId) {

  if(typeof categoryId === 'undefined') {
    return 'root';
  }

  return parseInt(categoryId);
};
