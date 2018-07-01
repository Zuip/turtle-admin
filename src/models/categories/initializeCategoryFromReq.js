let Category = require('./Category');

module.exports = function(req) {

  let category = new Category();

  if(typeof req.params.categoryId !== 'undefined') {
    category.id = req.params.categoryId;
  }

  if(typeof req.body.parent !== 'undefined') {
    category.parentId = req.body.parent;
  }

  category.name = req.body.name;
  category.urlName = req.body.urlName;
  category.description = req.body.description;
  category.published = req.body.published === 'yes' ? true : false;

  return category;
};
